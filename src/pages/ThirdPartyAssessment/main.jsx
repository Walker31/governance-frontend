import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users, Shield, CheckCircle, AlertTriangle, Clock, Download, Plus, Edit, Eye, FileText,
  Building, Globe, Target, TrendingUp, Activity, Calendar, Search, Filter, Database, BarChart3,
} from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ThirdPartyAssessment = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddAssessmentOpen, setIsAddAssessmentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const thirdPartyVendors = [
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "AI/ML Services",
      risk: "High",
      compliance: 78,
      status: "Under Review",
      lastAssessment: "2024-01-10",
      nextAssessment: "2024-04-10",
      frameworks: ["GDPR", "ISO 27001", "SOC 2"],
      description: "Cloud-based AI platform provider",
    },
    {
      id: 2,
      name: "DataFlow Analytics",
      type: "Data Processing",
      risk: "Medium",
      compliance: 85,
      status: "Compliant",
      lastAssessment: "2024-01-05",
      nextAssessment: "2024-07-05",
      frameworks: ["GDPR", "CCPA", "ISO 27001"],
      description: "Data analytics and processing services",
    },
    {
      id: 3,
      name: "SecureNet Systems",
      type: "Cybersecurity",
      risk: "Low",
      compliance: 92,
      status: "Compliant",
      lastAssessment: "2024-01-15",
      nextAssessment: "2024-10-15",
      frameworks: ["ISO 27001", "SOC 2", "NIST"],
      description: "Cybersecurity and threat detection",
    },
    {
      id: 4,
      name: "CloudTech Services",
      type: "Cloud Infrastructure",
      risk: "High",
      compliance: 65,
      status: "Non-Compliant",
      lastAssessment: "2024-01-08",
      nextAssessment: "2024-03-08",
      frameworks: ["ISO 27001", "SOC 2"],
      description: "Cloud infrastructure and hosting services",
    },
    {
      id: 5,
      name: "AI Solutions Pro",
      type: "AI/ML Services",
      risk: "Medium",
      compliance: 88,
      status: "Compliant",
      lastAssessment: "2024-01-12",
      nextAssessment: "2024-07-12",
      frameworks: ["GDPR", "AI Act", "ISO 27001"],
      description: "AI model development and deployment",
    },
  ];

  const frameworks = [
    {
      name: "GDPR",
      status: "Compliant",
      compliance: 92,
      vendors: 8,
      lastUpdated: "2024-01-15",
      description: "General Data Protection Regulation",
    },
    {
      name: "ISO 27001",
      status: "In Progress",
      compliance: 78,
      vendors: 12,
      lastUpdated: "2024-01-10",
      description: "Information Security Management",
    },
    {
      name: "SOC 2",
      status: "Compliant",
      compliance: 85,
      vendors: 6,
      lastUpdated: "2024-01-08",
      description: "System and Organization Controls",
    },
    {
      name: "CCPA",
      status: "Assessment",
      compliance: 65,
      vendors: 4,
      lastUpdated: "2024-01-05",
      description: "California Consumer Privacy Act",
    },
    {
      name: "AI Act",
      status: "In Progress",
      compliance: 45,
      vendors: 3,
      lastUpdated: "2024-01-03",
      description: "European Union AI Act",
    },
    {
      name: "NIST",
      status: "Compliant",
      compliance: 88,
      vendors: 5,
      lastUpdated: "2024-01-12",
      description: "National Institute of Standards and Technology",
    },
  ];

  const assessmentHistory = [
    {
      id: 1,
      vendor: "TechCorp Solutions",
      framework: "GDPR",
      date: "2024-01-10",
      status: "Completed",
      score: 78,
      findings: 5,
      criticalIssues: 1,
    },
    {
      id: 2,
      vendor: "DataFlow Analytics",
      framework: "ISO 27001",
      date: "2024-01-05",
      status: "Completed",
      score: 85,
      findings: 3,
      criticalIssues: 0,
    },
    {
      id: 3,
      vendor: "CloudTech Services",
      framework: "SOC 2",
      date: "2024-01-08",
      status: "Failed",
      score: 45,
      findings: 12,
      criticalIssues: 4,
    },
  ];

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Risk</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Compliant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>;
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Under Review</Badge>;
      case "Non-Compliant":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Non-Compliant</Badge>;
      case "Assessment":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Assessment</Badge>;
      case "In Progress":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAssessmentStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      case "Pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredVendors = thirdPartyVendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const complianceData = [
    { name: "Compliant", value: frameworks.filter(f => f.status === "Compliant").length, color: "#10b981" },
    { name: "In Progress", value: frameworks.filter(f => f.status === "In Progress").length, color: "#f59e0b" },
    { name: "Assessment", value: frameworks.filter(f => f.status === "Assessment").length, color: "#3b82f6" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-background">
      <main className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Users className="w-8 h-8" />
                Third-Party Assessment
              </h1>
              <p className="text-muted-foreground">
                Comprehensive evaluation of third-party vendors and compliance frameworks
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Dialog open={isAddAssessmentOpen} onOpenChange={setIsAddAssessmentOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Start New Assessment</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="vendor" className="text-sm font-medium">Vendor</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {thirdPartyVendors.map((vendor) => (
                            <SelectItem key={vendor.id} value={vendor.id.toString()}>
                              {vendor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="framework" className="text-sm font-medium">Framework</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select framework" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworks.map((framework) => (
                            <SelectItem key={framework.name} value={framework.name}>
                              {framework.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                      <Textarea id="notes" placeholder="Assessment notes..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddAssessmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddAssessmentOpen(false)}>
                      Start Assessment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search vendors by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {thirdPartyVendors.length}
              </div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Vendors</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {thirdPartyVendors.filter(vendor => vendor.risk === "High").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliant Vendors</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {thirdPartyVendors.filter(vendor => vendor.status === "Compliant").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Meeting all requirements
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(thirdPartyVendors.reduce((sum, vendor) => sum + vendor.compliance, 0) / thirdPartyVendors.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall compliance score
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-card via-card/80 to-card p-2 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Compliance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complianceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {complianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {complianceData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assessmentHistory.slice(0, 3).map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{assessment.vendor}</p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.framework} • {assessment.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="font-medium">{assessment.score}%</div>
                            <div className="text-xs text-muted-foreground">{assessment.findings} findings</div>
                          </div>
                          {getAssessmentStatusBadge(assessment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Third-Party Vendors
                </CardTitle>
                <CardDescription>
                  Complete overview of vendor assessments and compliance status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Compliance Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Assessment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">
                          {vendor.name}
                        </TableCell>
                        <TableCell>{vendor.type}</TableCell>
                        <TableCell>{getRiskBadge(vendor.risk)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={vendor.compliance}
                              className="w-16 h-2"
                            />
                            <span className="text-sm">{vendor.compliance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {vendor.nextAssessment}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Frameworks Tab */}
          <TabsContent value="frameworks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Compliance Frameworks
                </CardTitle>
                <CardDescription>
                  Regulatory frameworks and compliance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {frameworks.map((framework) => (
                    <div key={framework.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{framework.name}</h4>
                          <p className="text-sm text-muted-foreground">{framework.description}</p>
                        </div>
                        {getStatusBadge(framework.status)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Compliance</span>
                          <span className="text-sm font-medium">{framework.compliance}%</span>
                        </div>
                        <Progress value={framework.compliance} className="h-2" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Vendors</span>
                          <span>{framework.vendors}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span>{framework.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Assessment History
                </CardTitle>
                <CardDescription>
                  Historical assessment records and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Framework</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Findings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessmentHistory.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell className="font-medium">{assessment.vendor}</TableCell>
                        <TableCell>{assessment.framework}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell>{getAssessmentStatusBadge(assessment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={assessment.score}
                              className="w-16 h-2"
                            />
                            <span className="text-sm">{assessment.score}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{assessment.findings} total</div>
                            <div className="text-red-600">{assessment.criticalIssues} critical</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ThirdPartyAssessment; 