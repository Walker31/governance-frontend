import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Edit, Eye, FileText, Database, Shield, Users, Search, Play, Activity, AlertTriangle, CheckCircle, Clock, Target } from "lucide-react";


const assessmentData = [
  { 
    code: 'AI-1.1', 
    section: 'Model Governance', 
    control: 'Model Lifecycle Management',
    requirements: 'Establish comprehensive lifecycle management for AI models including development, testing, deployment, and retirement phases',
    status: 'Compliant',
    tickets: 'None'
  },
  { 
    code: 'AI-1.2', 
    section: 'Model Governance', 
    control: 'Version Control',
    requirements: 'Implement version control systems for AI models with proper documentation and change management',
    status: 'Compliant',
    tickets: 'None'
  },
  { 
    code: 'AI-1.3', 
    section: 'Model Governance', 
    control: 'Model Testing',
    requirements: 'Perform comprehensive testing including accuracy, bias, and robustness testing before deployment',
    status: 'In Progress',
    tickets: 'TICK-123'
  },
  { 
    code: 'AI-1.4', 
    section: 'Model Governance', 
    control: 'Performance Monitoring',
    requirements: 'Continuous monitoring of model performance including drift detection and degradation alerts',
    status: 'Planned',
    tickets: 'TICK-456'
  },
  { 
    code: 'AI-1.5', 
    section: 'Model Governance', 
    control: 'Model Documentation',
    requirements: 'Maintain comprehensive documentation including model cards, training data, and performance metrics',
    status: 'Compliant',
    tickets: 'None'
  },
  { 
    code: 'AI-2.1', 
    section: 'Data Management', 
    control: 'Data Quality',
    requirements: 'Ensure high data quality standards with validation, cleaning, and quality assessment processes',
    status: 'Compliant',
    tickets: 'None'
  },
  { 
    code: 'AI-2.2', 
    section: 'Data Management', 
    control: 'Data Privacy',
    requirements: 'Implement privacy-preserving techniques and ensure compliance with data protection regulations',
    status: 'In Progress',
    tickets: 'TICK-789'
  },
  { 
    code: 'AI-2.3', 
    section: 'Data Management', 
    control: 'Data Lineage',
    requirements: 'Track data lineage from source to model consumption with full auditability',
    status: 'Planned',
    tickets: 'TICK-012'
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Compliant':
      return <Badge className="bg-green-600 text-white">Compliant</Badge>;
    case 'In Progress':
      return <Badge className="bg-yellow-600 text-white">In Progress</Badge>;
    case 'Planned':
      return <Badge className="bg-blue-600 text-white">Planned</Badge>;
    case 'Not Performed':
      return <Badge className="bg-red-600 text-white">Not Performed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const ControlAssessment = () => {
  return (
    <>
      {/* Controls Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Controls Assessment</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="not-performed">Not Performed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">CODE</TableHead>
                <TableHead className="w-40">SECTION</TableHead>
                <TableHead className="w-48">CONTROL</TableHead>
                <TableHead>REQUIREMENTS</TableHead>
                <TableHead className="w-32">STATUS</TableHead>
                <TableHead className="w-24">TICKETS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessmentData.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">
                    {item.code}
                  </TableCell>
                  <TableCell className="font-medium">{item.section}</TableCell>
                  <TableCell className="font-medium">{item.control}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">
                    {item.requirements}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-sm">
                    {item.tickets === "None" ? (
                      <span className="text-muted-foreground">None</span>
                    ) : (
                      <Badge variant="outline">{item.tickets}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
export default ControlAssessment;
