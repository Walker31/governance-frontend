import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, Calendar, Eye, Lock, Globe, Shield, Users, Gavel } from "lucide-react";
import TrustCenterChatbot from "@/components/trustCentreBot";

const TrustCenterDocuments = () => {
  const policyDocuments = [
    {
      title: "Privacy Policy",
      description: "Comprehensive data protection and privacy guidelines",
      category: "Privacy",
      lastUpdated: "2024-01-15",
      version: "v3.2",
      size: "245 KB",
      type: "Policy",
      access: "Public",
      downloads: 1247
    },
    {
      title: "Terms of Service",
      description: "Legal terms and conditions for service usage",
      category: "Legal",
      lastUpdated: "2024-01-10",
      version: "v2.8",
      size: "189 KB",
      type: "Agreement",
      access: "Public",
      downloads: 892
    },
    {
      title: "Data Processing Agreement",
      description: "GDPR-compliant data processing terms for business clients",
      category: "Compliance",
      lastUpdated: "2024-01-08",
      version: "v1.5",
      size: "156 KB",
      type: "Agreement",
      access: "Business",
      downloads: 234
    },
    {
      title: "Cookie Policy",
      description: "Information about cookie usage and user consent",
      category: "Privacy",
      lastUpdated: "2024-01-05",
      version: "v2.1",
      size: "98 KB",
      type: "Policy",
      access: "Public",
      downloads: 567
    }
  ];

  const certifications = [
    {
      title: "ISO 27001 Certificate",
      description: "Information Security Management System certification",
      issuer: "BSI Group",
      validUntil: "2025-03-15",
      category: "Security",
      size: "2.1 MB",
      type: "Certificate"
    },
    {
      title: "SOC 2 Type II Report",
      description: "System and Organization Controls audit report",
      issuer: "Deloitte",
      validUntil: "2024-12-31",
      category: "Compliance",
      size: "4.8 MB",
      type: "Report"
    },
    {
      title: "GDPR Compliance Certificate",
      description: "European data protection regulation compliance",
      issuer: "TÜV SÜD",
      validUntil: "2025-01-20",
      category: "Privacy",
      size: "1.7 MB",
      type: "Certificate"
    },
    {
      title: "PCI DSS Compliance",
      description: "Payment Card Industry Data Security Standard",
      issuer: "Qualys",
      validUntil: "2024-11-30",
      category: "Security",
      size: "3.2 MB",
      type: "Certificate"
    }
  ];

  const auditReports = [
    {
      title: "Q4 2024 Security Audit",
      description: "Comprehensive security assessment and recommendations",
      auditor: "CyberSec Partners",
      date: "2024-01-15",
      category: "Security",
      size: "5.6 MB",
      findings: "12 recommendations",
      access: "Internal"
    },
    {
      title: "Privacy Impact Assessment",
      description: "GDPR compliance and data protection evaluation",
      auditor: "Privacy Consultants Ltd",
      date: "2024-01-10",
      category: "Privacy",
      size: "3.4 MB",
      findings: "8 recommendations",
      access: "Internal"
    },
    {
      title: "Third-Party Risk Assessment",
      description: "Vendor security and compliance evaluation",
      auditor: "Risk Advisory Group",
      date: "2024-01-05",
      category: "Risk",
      size: "2.9 MB",
      findings: "15 recommendations",
      access: "Confidential"
    }
  ];

  const getAccessIcon = (access) => {
    switch (access) {
      case "Public": return <Globe className="w-4 h-4 text-green-500" />;
      case "Business": return <Users className="w-4 h-4 text-blue-500" />;
      case "Internal": return <Shield className="w-4 h-4 text-orange-500" />;
      case "Confidential": return <Lock className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Privacy": return "bg-blue-500";
      case "Security": return "bg-red-500";
      case "Legal": return "bg-purple-500";
      case "Compliance": return "bg-green-500";
      case "Risk": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background flex-1">
      
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Trust Center Documents</h1>
              <p className="text-muted-foreground">Access policies, certifications, and compliance documentation</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-10 w-64" />
              </div>
            </div>
          </div>

          {/* Document Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Public Documents</CardTitle>
                <Globe className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Available to all users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                <Shield className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active certifications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,940</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="policies" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-card via-card/80 to-card p-2 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
              <TabsTrigger 
                value="policies" 
                className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                Policies & Agreements
              </TabsTrigger>
              <TabsTrigger 
                value="certifications" 
                className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                Certifications
              </TabsTrigger>
              <TabsTrigger 
                value="audits" 
                className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:translate-y-[-2px] hover:shadow-md hover:shadow-blue-500/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                Audit Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="policies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Policies & Legal Agreements</CardTitle>
                  <CardDescription>
                    Official policies, terms of service, and legal documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policyDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-start gap-4 flex-1">
                          <FileText className="w-8 h-8 text-muted-foreground mt-1" />
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{doc.title}</h3>
                              <Badge 
                                variant="secondary"
                                className={`text-white ${getCategoryColor(doc.category)}`}
                              >
                                {doc.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getAccessIcon(doc.access)}
                                <span className="text-xs text-muted-foreground">{doc.access}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Updated {doc.lastUpdated}
                              </span>
                              <span>{doc.version}</span>
                              <span>{doc.size}</span>
                              <span className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {doc.downloads} downloads
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance Certifications</CardTitle>
                  <CardDescription>
                    Third-party certifications and compliance attestations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center gap-3">
                          <Shield className="w-8 h-8 text-blue-500" />
                          <div>
                            <h3 className="font-semibold">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Valid until:</span>
                            <span className="font-medium">{cert.validUntil}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Category:</span>
                            <Badge 
                              variant="secondary"
                              className={`text-white ${getCategoryColor(cert.category)}`}
                            >
                              {cert.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Reports & Assessments</CardTitle>
                  <CardDescription>
                    Internal and external audit findings and compliance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditReports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-start gap-4 flex-1">
                          <Gavel className="w-8 h-8 text-orange-500 mt-1" />
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{report.title}</h3>
                              <Badge 
                                variant="secondary"
                                className={`text-white ${getCategoryColor(report.category)}`}
                              >
                                {report.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getAccessIcon(report.access)}
                                <span className="text-xs text-muted-foreground">{report.access}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Auditor: {report.auditor}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.date}
                              </span>
                              <span>{report.size}</span>
                              <span className="text-orange-600">{report.findings}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Summary
                          </Button>
                          {report.access !== "Confidential" && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
        </main>
        <TrustCenterChatbot />
    </div>
  );
};

export default TrustCenterDocuments;