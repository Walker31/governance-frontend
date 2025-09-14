import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Added shadcn dropdown
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Plus,
  Download,
  MessageSquare,
  Calendar,
  User,
  Filter,
  Search,
  ArrowLeft,
  ChevronDown,
  X,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import riskMatrixService from "../../../services/riskMatrixService";

const AIRiskAssessment = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWeightsModal, setShowWeightsModal] = useState(false);
  const [riskDetailsExpanded, setRiskDetailsExpanded] = useState(false);
  const [riskAnalysisExpanded, setRiskAnalysisExpanded] = useState(true);
  const [riskMatrixResults, setRiskMatrixResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const [riskStats, setRiskStats] = useState({
    riskLevels: { Critical: 0, High: 0, Medium: 0, Low: 0 },
    percentages: { Critical: 0, High: 0, Medium: 0, Low: 0 },
    totalRisks: 0,
    totalAssessments: 0,
    summary: {
      totalAssessments: 0,
      completedAssessments: 0,
      pendingAssessments: 0,
    },
  });

  const [pieData, setPieData] = useState([
    { name: "Critical", value: 0, color: "#ef4444" },
    { name: "High", value: 0, color: "#f97316" },
    { name: "Medium", value: 0, color: "#eab308" },
    { name: "Low", value: 0, color: "#22c55e" },
  ]);

  const criticalCount = pieData.find((d) => d.name === "Critical")?.value || 0;
  const totalCount = pieData.reduce((sum, d) => sum + d.value, 0);
  const criticalPercent = totalCount
    ? Math.round((criticalCount / totalCount) * 100)
    : 0;

  const handleRiskClick = (risk) => {
    setSelectedRisk(risk);
    setCurrentView("detail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedRisk(null);
  };

  const fetchRiskMatrixResults = async (params = {}) => {
    try {
      setLoading(true);
      const response = await riskMatrixService.getRisksBySystemType(
        'AI',{
        page: params.page || pagination.page,
        limit: params.limit || pagination.limit,
        search: params.search || searchQuery,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setRiskMatrixResults(response.risks || []);
      setPagination(
        response.pagination || { page: 1, limit: 10, total: 0, pages: 0 }
      );
    } catch (error) {
      console.error("Error fetching risks:", error);
      setRiskMatrixResults([]); // Set to empty on error
    } finally {
      setLoading(false);
    }
  };

  const fetchRiskStats = async () => {
    try {
      const stats = await riskMatrixService.getRiskStatistics();
      setRiskStats(stats);

      const newPieData = [
        {
          name: "Critical",
          value: stats.riskLevels?.Critical || 0,
          color: "#ef4444",
        },
        { name: "High", value: stats.riskLevels?.High || 0, color: "#f97316" },
        {
          name: "Medium",
          value: stats.riskLevels?.Medium || 0,
          color: "#eab308",
        },
        { name: "Low", value: stats.riskLevels?.Low || 0, color: "#22c55e" },
      ];
      setPieData(newPieData);
    } catch (error) {
      console.error("Error fetching risk statistics:", error);
    }
  };

  useEffect(() => {
    fetchRiskMatrixResults();
    fetchRiskStats();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchRiskMatrixResults({ search: query, page: 1 });
  };

  const handleStatusUpdate = async (riskId, status) => {
    console.log(`Updating risk ${riskId} to status: ${status}`);
    // This is where you call your service to update the risk
    // For example:
    await handleEditRisk(riskId, {
      strategy: status,
      strategyStatus: "In Progress",
    });
  };

  const handleAddRisk = async (riskData) => {
    try {
      await riskMatrixService.storeRisks(riskData);
      await fetchRiskMatrixResults();
      await fetchRiskStats();
    } catch (error) {
      console.error("Error adding risk:", error);
    }
  };

  const handleEditRisk = async (riskId, updateData) => {
    try {
      await riskMatrixService.updateRisk(riskId, updateData);
      await fetchRiskMatrixResults();
      await fetchRiskStats();
    } catch (error) {
      console.error("Error editing risk:", error);
    }
  };

  const handleDeleteRisk = async (riskId) => {
    try {
      await riskMatrixService.deleteRisk(riskId);
      await fetchRiskMatrixResults();
      await fetchRiskStats();
    } catch (error) {
      console.error("Error deleting risk:", error);
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Risk Manager</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      <Tabs defaultValue="my-risks" className="w-full">
        <TabsList className="justify-center grid w-full grid-cols-3 bg-gradient-to-r from-card via-card/80 to-card p-2 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
          <TabsTrigger
            value="my-risks"
            className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            My Risks ({pagination.total})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-risks" className="space-y-6 mt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add risk
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export risks
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks level</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {criticalPercent}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Critical risks
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium">
                      {riskStats?.summary?.completedAssessments || 0}{" "}
                      assessments
                    </span>
                  </div>
                  <Progress
                    value={
                      riskStats?.summary?.totalAssessments > 0
                        ? (riskStats?.summary?.completedAssessments /
                            riskStats?.summary?.totalAssessments) *
                          100
                        : 0
                    }
                    className="h-3"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Pending</span>
                    <span className="text-sm font-medium">
                      {riskStats?.summary?.pendingAssessments || 0} assessments
                    </span>
                  </div>
                  <Progress
                    value={
                      riskStats?.summary?.totalAssessments > 0
                        ? (riskStats?.summary?.pendingAssessments /
                            riskStats?.summary?.totalAssessments) *
                          100
                        : 0
                    }
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-1 h-24">
                  {Array.from({ length: 25 }, (_, i) => {
                    let bgColor = "bg-cyan-200";
                    if (i === 18) bgColor = "bg-orange-400";
                    if (i === 23) bgColor = "bg-pink-400";
                    if (i === 24) bgColor = "bg-pink-500";
                    return (
                      <div key={i} className={`${bgColor} rounded-sm`}></div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>PROJECT ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Risk level</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Strategy status</TableHead>
                    <TableHead>Controls</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2">Loading risks...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : riskMatrixResults.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No risks found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    riskMatrixResults.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell
                          className="font-medium text-blue-600 cursor-pointer hover:underline"
                          onClick={() => handleRiskClick(item)}
                        >
                          {item.riskAssessmentId}
                        </TableCell>
                        <TableCell>{item.projectId || "Not set"}</TableCell>
                        <TableCell>{item.riskName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              item.severity >= 5
                                ? "bg-red-100 text-red-800"
                                : item.severity >= 4
                                ? "bg-orange-100 text-orange-800"
                                : item.severity >= 3
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {item.severity === 5
                              ? "Critical"
                              : item.severity === 4
                              ? "High"
                              : item.severity === 3
                              ? "Medium"
                              : item.severity === 2
                              ? "Low"
                              : "Very Low"}{" "}
                            ({item.severity})
                          </Badge>
                        </TableCell>
                        <TableCell>{item.strategy || "Not set"}</TableCell>
                        <TableCell>
                          {item.strategyStatus || "Not started"}
                        </TableCell>
                        <TableCell>{item.controlCount || 0}</TableCell>
                        <TableCell>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                              {item.riskOwner?.charAt(0) ||
                                item.createdBy?.name?.charAt(0) ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <span className="sr-only">Open menu</span>
                                •••
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() =>
                                  handleStatusUpdate(item._id, "Accept")
                                }
                              >
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  handleStatusUpdate(item._id, "Mitigate")
                                }
                              >
                                Mitigate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  handleStatusUpdate(item._id, "Transfer")
                                }
                              >
                                Transfer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  handleStatusUpdate(item._id, "Avoid")
                                }
                              >
                                Avoid
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">
              Dashboard Content
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Dashboard view will be displayed here
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">
              Settings
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Settings configuration will be displayed here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const DetailView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackToDashboard}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all risks
          </Button>
          <div className="text-sm text-muted-foreground">
            murat.uinnain@anecdotes.ai • Today • Last updated by
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              {selectedRisk?.riskAssessmentId}
            </h1>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              {selectedRisk?.severity}
            </Badge>
            <Badge variant="outline">{selectedRisk?.strategy}</Badge>
          </div>
          <h2 className="text-xl text-muted-foreground mt-1">
            {selectedRisk?.riskName}
          </h2>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          Link control
        </Button>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add document
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Comments
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Tasks
        </Button>
        <Button variant="outline" size="sm">
          Activity log
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm">Residual risk automation</span>
          <Switch />
        </div>
      </div>
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setRiskDetailsExpanded(!riskDetailsExpanded)}
        >
          <CardTitle className="flex items-center gap-2">
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                riskDetailsExpanded ? "rotate-180" : ""
              }`}
            />
            Risk details
          </CardTitle>
        </CardHeader>
        {riskDetailsExpanded && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Risk details content will be displayed here
            </p>
          </CardContent>
        )}
      </Card>
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setRiskAnalysisExpanded(!riskAnalysisExpanded)}
        >
          <CardTitle className="flex items-center gap-2">
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                riskAnalysisExpanded ? "rotate-180" : ""
              }`}
            />
            Risk analysis
          </CardTitle>
        </CardHeader>
        {riskAnalysisExpanded && (
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Inherent risk</h4>
              <div className="flex justify-around gap-4 items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Impact</span>
                  <Badge className="bg-pink-500 text-white ml-2">
                    Major (4)
                  </Badge>
                </div>
                <div className="text-center">×</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Likelihood
                  </span>
                  <Badge className="bg-orange-500 text-white ml-2">
                    Possible (3)
                  </Badge>
                </div>
                <div className="text-center">=</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Risk level
                  </span>
                  <Badge className="bg-orange-500 text-white ml-2">
                    High (12)
                  </Badge>
                </div>
                <div></div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Financial impact
                  </span>
                  <div className="text-sm mt-1">Not set</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Residual risk</h4>
              <div className="flex justify-around gap-4 items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Impact</span>
                  <Badge className="bg-pink-500 text-white ml-2">
                    Major (4)
                  </Badge>
                </div>
                <div className="text-center">×</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Likelihood
                  </span>
                  <Badge className="bg-orange-500 text-white ml-2">
                    Possible (3)
                  </Badge>
                </div>
                <div className="text-center">=</div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Risk level
                  </span>
                  <Badge className="bg-orange-500 text-white ml-2">
                    High (12)
                  </Badge>
                </div>
                <div></div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Financial impact
                  </span>
                  <div className="text-sm mt-1">Not set</div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Target risk level
              </span>
              <Badge className="bg-teal-500 text-white ml-2">Medium</Badge>
            </div>
            <div className="text-right">
              <Button variant="link" className="text-blue-600">
                How is the Risk level calculated?
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Mitigating controls (1)
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Link control
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control name</TableHead>
                <TableHead>Control status</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>8.32 Change management</TableCell>
                <TableCell>
                  <Badge className="bg-pink-100 text-pink-800">Gap</Badge>
                </TableCell>
                <TableCell>4/5</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Dialog
                    open={showWeightsModal}
                    onOpenChange={setShowWeightsModal}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Set weights
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <DialogTitle className="text-base font-medium">
                            Set control weighting
                          </DialogTitle>
                          <p className="text-sm text-muted-foreground">
                            8.32 Change management
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowWeightsModal(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Define the impact and likelihood weights for this
                          mitigating control:
                        </p>
                        <div className="grid grid-cols-3 gap-1 items-end">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">
                              Control maturity
                            </div>
                            <div className="text-sm font-medium">4/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">
                              Impact weight
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <Input
                                type="number"
                                className="w-12 h-8 text-center text-sm"
                              />
                              <span className="text-xs">%</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">
                              Likelihood weight
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <Input
                                type="number"
                                className="w-12 h-8 text-center text-sm"
                              />
                              <span className="text-xs">%</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3 bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                              1
                            </div>
                            <span className="text-sm font-medium">
                              Theoretical risk level:
                            </span>
                          </div>
                          <div className="space-y-2 ml-7">
                            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                              <span>From:</span>
                              <span></span>
                              <span>To:</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">
                                Impact
                              </div>
                              <div className="text-center text-xs">{">"}</div>
                              <div className="text-xs text-muted-foreground">
                                Impact
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-pink-500 text-white text-xs">
                                Major (4)
                              </Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs">×</div>
                              <div></div>
                              <div className="text-xs">×</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">
                                Likelihood
                              </div>
                              <div className="text-center text-xs">{">"}</div>
                              <div className="text-xs text-muted-foreground">
                                Likelihood
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-orange-500 text-white text-xs">
                                Possible (3)
                              </Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs">=</div>
                              <div></div>
                              <div className="text-xs">=</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">
                                Risk level
                              </div>
                              <div className="text-center text-xs">{">"}</div>
                              <div className="text-xs text-muted-foreground">
                                Risk level
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-orange-500 text-white text-xs">
                                High (12)
                              </Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button
                            variant="link"
                            className="text-blue-600 text-sm p-0 h-auto"
                          >
                            How is this calculated?
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="ml-2">
                    •••
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Treatment plan</span>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add plan
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tasks (0)</span>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add task
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex-1">
      <main className="p-6">
        {currentView === "dashboard" ? <DashboardView /> : <DetailView />}
      </main>
    </div>
  );
};

export default AIRiskAssessment;
