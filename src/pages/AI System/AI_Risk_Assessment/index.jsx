import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Plus, Download, MessageSquare, Calendar, User, Filter, Search, ArrowLeft, ChevronDown, X, Settings } from "lucide-react";
import { useState } from "react";

const AIRiskAssessment = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWeightsModal, setShowWeightsModal] = useState(false);
  const [riskDetailsExpanded, setRiskDetailsExpanded] = useState(false);
  const [riskAnalysisExpanded, setRiskAnalysisExpanded] = useState(true);

  const pieData = [
    { name: 'Critical', value: 0, color: '#ef4444' },
    { name: 'High', value: 1, color: '#f97316' },
    { name: 'Medium', value: 3, color: '#eab308' },
    { name: 'Low', value: 10, color: '#22c55e' },
  ];

  const riskItems = [
    {
      id: "R-006B",
      name: "SCF-AM: 2 Loss of integrity through unauthorized changes",
      riskLevel: "High (15)",
      strategy: "Not set",
      strategyStatus: "Not started",
      controls: 1,
      manager: "JD",
      impact: "Major (4)",
      likelihood: "Possible (3)",
      financialImpact: "Not set",
      targetRiskLevel: "Medium"
    }
  ];

  const handleRiskClick = (risk) => {
    setSelectedRisk(risk);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedRisk(null);
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Risk Manager</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      <Tabs defaultValue="my-risks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-card via-card/80 to-card p-2 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
          <TabsTrigger 
            value="my-risks" 
            className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            My Risks (14)
          </TabsTrigger>
          <TabsTrigger 
            value="dashboard" 
            className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-risks" className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add risk
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export risks
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Tasks
            </Button>
            <Button variant="outline">
              Pending update approval (0)
            </Button>
            <Button variant="outline">
              Risks in treatment (0)
            </Button>
            <Button variant="outline">
              Risks pending treatment (0)
            </Button>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Risks Level */}
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
                    <span className="text-2xl font-bold">0%</span>
                    <span className="text-sm text-muted-foreground">Critical risks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risks Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Not set</span>
                    <span className="text-sm font-medium">1 risk</span>
                  </div>
                  <Progress value={100} className="h-3 bg-orange-200">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }} />
                  </Progress>
                </div>
              </CardContent>
            </Card>

            {/* Risks Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-1 h-24">
                  {Array.from({ length: 25 }, (_, i) => {
                    let bgColor = 'bg-cyan-200';
                    if (i === 18) bgColor = 'bg-orange-400';
                    if (i === 23) bgColor = 'bg-pink-400';
                    if (i === 24) bgColor = 'bg-pink-500';
                    return (
                      <div key={i} className={`${bgColor} rounded-sm`}></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm">
              High (1)
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          </div>

          {/* Risk Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Risk level</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Strategy status</TableHead>
                    <TableHead>Controls</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell 
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleRiskClick(item)}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {item.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.strategy}</TableCell>
                      <TableCell>{item.strategyStatus}</TableCell>
                      <TableCell>{item.controls}</TableCell>
                      <TableCell>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {item.manager}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">•••</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Dashboard Content</h3>
            <p className="text-sm text-muted-foreground mt-2">Dashboard view will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Settings</h3>
            <p className="text-sm text-muted-foreground mt-2">Settings configuration will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Detail View
  const DetailView = () => (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Risk Header */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{selectedRisk?.id}</h1>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {selectedRisk?.riskLevel}
            </Badge>
            <Badge variant="outline">{selectedRisk?.strategy}</Badge>
          </div>
          <h2 className="text-xl text-muted-foreground mt-1">{selectedRisk?.name}</h2>
        </div>
      </div>

      {/* Action Buttons */}
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

      {/* Risk Details */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setRiskDetailsExpanded(!riskDetailsExpanded)}>
          <CardTitle className="flex items-center gap-2">
            <ChevronDown className={`w-4 h-4 transition-transform ${riskDetailsExpanded ? 'rotate-180' : ''}`} />
            Risk details
          </CardTitle>
        </CardHeader>
        {riskDetailsExpanded && (
          <CardContent>
            <p className="text-sm text-muted-foreground">Risk details content will be displayed here</p>
          </CardContent>
        )}
      </Card>

      {/* Risk Analysis */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setRiskAnalysisExpanded(!riskAnalysisExpanded)}>
          <CardTitle className="flex items-center gap-2">
            <ChevronDown className={`w-4 h-4 transition-transform ${riskAnalysisExpanded ? 'rotate-180' : ''}`} />
            Risk analysis
          </CardTitle>
        </CardHeader>
        {riskAnalysisExpanded && (
          <CardContent className="space-y-6">
            {/* Inherent Risk */}
            <div>
              <h4 className="font-medium mb-4">Inherent risk</h4>
              <div className="flex justify-around gap-4 items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Impact</span>
                  <Badge className="bg-pink-500 text-white ml-2">Major (4)</Badge>
                </div>
                <div className="text-center">×</div>
                <div>
                  <span className="text-sm text-muted-foreground">Likelihood</span>
                  <Badge className="bg-orange-500 text-white ml-2">Possible (3)</Badge>
                </div>
                <div className="text-center">=</div>
                <div>
                  <span className="text-sm text-muted-foreground">Risk level</span>
                  <Badge className="bg-orange-500 text-white ml-2">High (12)</Badge>
                </div>
                <div></div>
                <div>
                  <span className="text-sm text-muted-foreground">Financial impact</span>
                  <div className="text-sm mt-1">Not set</div>
                </div>
              </div>
            </div>

            {/* Residual Risk */}
            <div>
              <h4 className="font-medium mb-4">Residual risk</h4>
              <div className="flex justify-around gap-4 items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Impact</span>
                  <Badge className="bg-pink-500 text-white ml-2">Major (4)</Badge>
                </div>
                <div className="text-center">×</div>
                <div>
                  <span className="text-sm text-muted-foreground">Likelihood</span>
                  <Badge className="bg-orange-500 text-white ml-2">Possible (3)</Badge>
                </div>
                <div className="text-center">=</div>
                <div>
                  <span className="text-sm text-muted-foreground">Risk level</span>
                  <Badge className="bg-orange-500 text-white ml-2">High (12)</Badge>
                </div>
                <div></div>
                <div>
                  <span className="text-sm text-muted-foreground">Financial impact</span>
                  <div className="text-sm mt-1">Not set</div>
                </div>
              </div>
            </div>

            {/* Target Risk Level */}
            <div>
              <span className="text-sm text-muted-foreground">Target risk level</span>
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

      {/* Mitigating Controls */}
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
                  <Dialog open={showWeightsModal} onOpenChange={setShowWeightsModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Set weights
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <DialogTitle className="text-base font-medium">Set control weighting</DialogTitle>
                          <p className="text-sm text-muted-foreground">8.32 Change management</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setShowWeightsModal(false)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Define the impact and likelihood weights for this mitigating control:
                        </p>
                        
                        <div className="grid grid-cols-3 gap-1 items-end">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Control maturity</div>
                            <div className="text-sm font-medium">4/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Impact weight</div>
                            <div className="flex items-center justify-center gap-1">
                              <Input type="number" className="w-12 h-8 text-center text-sm" />
                              <span className="text-xs">%</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Likelihood weight</div>
                            <div className="flex items-center justify-center gap-1">
                              <Input type="number" className="w-12 h-8 text-center text-sm" />
                              <span className="text-xs">%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">1</div>
                            <span className="text-sm font-medium">Theoretical risk level:</span>
                          </div>
                          
                          <div className="space-y-2 ml-7">
                            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                              <span>From:</span>
                              <span></span>
                              <span>To:</span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">Impact</div>
                              <div className="text-center text-xs">{'>'}</div>
                              <div className="text-xs text-muted-foreground">Impact</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-pink-500 text-white text-xs">Major (4)</Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs">×</div>
                              <div></div>
                              <div className="text-xs">×</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">Likelihood</div>
                              <div className="text-center text-xs">{'>'}</div>
                              <div className="text-xs text-muted-foreground">Likelihood</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-orange-500 text-white text-xs">Possible (3)</Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs">=</div>
                              <div></div>
                              <div className="text-xs">=</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <div className="text-xs text-muted-foreground">Risk level</div>
                              <div className="text-center text-xs">{'>'}</div>
                              <div className="text-xs text-muted-foreground">Risk level</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 items-center">
                              <Badge className="bg-orange-500 text-white text-xs">High (12)</Badge>
                              <div></div>
                              <div className="w-12 h-6 border border-gray-300 rounded bg-white"></div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                            How is this calculated?
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="ml-2">•••</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Treatment Plan */}
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

      {/* Tasks */}
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
          {currentView === 'dashboard' ? <DashboardView /> : <DetailView />}
        </main>
    </div>
  );
};

export default AIRiskAssessment;