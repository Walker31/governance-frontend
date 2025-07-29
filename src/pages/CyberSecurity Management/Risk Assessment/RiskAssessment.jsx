import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  FileText,
  Plus,
} from "lucide-react";

const RiskAssessment = () => {
  const riskAssessments = [
    {
      id: 1,
      title: "Network Security Assessment",
      category: "Infrastructure",
      status: "In Progress",
      priority: "High",
      progress: 65,
      lastUpdate: "2024-01-15",
      findings: 12,
      criticalIssues: 3,
    },
    {
      id: 2,
      title: "Application Security Review",
      category: "Software",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      lastUpdate: "2024-01-10",
      findings: 8,
      criticalIssues: 1,
    },
    {
      id: 3,
      title: "Data Privacy Assessment",
      category: "Compliance",
      status: "Pending",
      priority: "High",
      progress: 0,
      lastUpdate: "2024-01-08",
      findings: 0,
      criticalIssues: 0,
    },
  ];

  const vulnerabilities = [
    {
      id: 1,
      title: "Unpatched Systems",
      severity: "Critical",
      count: 15,
      description: "Multiple systems require security patches",
    },
    {
      id: 2,
      title: "Weak Authentication",
      severity: "High",
      count: 8,
      description: "Password policies not enforced",
    },
    {
      id: 3,
      title: "Network Exposure",
      severity: "Medium",
      count: 12,
      description: "Services exposed to internet",
    },
    {
      id: 4,
      title: "Data Encryption",
      severity: "Low",
      count: 5,
      description: "Some data not encrypted at rest",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background flex-1">
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Risk Assessment</h1>
            <p className="text-muted-foreground">
              Cybersecurity risk evaluation and management
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Assessments
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Critical Issues
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">4</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">18</div>
              <p className="text-xs text-muted-foreground">
                75% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">7.2</div>
              <p className="text-xs text-muted-foreground">Medium risk level</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assessments" className="space-y-4">
          <TabsList className="bg-gradient-to-r from-card via-card/80 to-card p-2 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
            <TabsTrigger
              value="assessments"
              className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              Active Assessments
            </TabsTrigger>
            <TabsTrigger
              value="vulnerabilities"
              className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Risk Assessments</CardTitle>
                <CardDescription>
                  Ongoing and recent cybersecurity risk evaluations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{assessment.title}</h3>
                          <Badge variant="outline">{assessment.category}</Badge>
                          <Badge
                            variant="secondary"
                            className={`text-white ${getStatusColor(
                              assessment.status
                            )}`}
                          >
                            {assessment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {assessment.lastUpdate}
                          </span>
                          <span>{assessment.findings} findings</span>
                          <span className="text-red-500">
                            {assessment.criticalIssues} critical
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{assessment.progress}%</span>
                          </div>
                          <Progress
                            value={assessment.progress}
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identified Vulnerabilities</CardTitle>
                <CardDescription>
                  Security weaknesses discovered during assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{vuln.title}</h3>
                        <Badge
                          variant="secondary"
                          className={`text-white ${getSeverityColor(
                            vuln.severity
                          )}`}
                        >
                          {vuln.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vuln.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          {vuln.count} instances
                        </span>
                        <Button variant="outline" size="sm">
                          Remediate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Reports</CardTitle>
                <CardDescription>
                  Generated reports and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Q4 2024 Risk Assessment Report",
                      date: "2024-01-15",
                      type: "Quarterly",
                      size: "2.4 MB",
                    },
                    {
                      name: "Network Security Audit",
                      date: "2024-01-10",
                      type: "Technical",
                      size: "1.8 MB",
                    },
                    {
                      name: "Compliance Assessment Summary",
                      date: "2024-01-05",
                      type: "Compliance",
                      size: "956 KB",
                    },
                    {
                      name: "Vulnerability Scan Results",
                      date: "2024-01-01",
                      type: "Scan",
                      size: "3.2 MB",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.type} • {report.date} • {report.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RiskAssessment;
