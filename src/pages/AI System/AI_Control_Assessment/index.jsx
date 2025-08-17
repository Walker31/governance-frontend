import React, { useEffect, useState } from "react";
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import controlService from "@/services/controlService";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "Compliant", label: "Compliant" },
  { value: "In Progress", label: "In Progress" },
  { value: "Planned", label: "Planned" },
  { value: "Not Performed", label: "Not Performed" },
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

const AIControlAssessment = () => {
  const [controls, setControls] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination defaults
  const page = 1, limit = 50;

  const fetchControls = async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit };
      if (status && status !== "all") params.status = status;
      const result = await controlService.getControls(params);
      
      setControls(result.controls || []);
    } catch (e) {
      setError(e.message || "Failed to load controls");
      setControls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControls();
  }, [status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI System Controls Assessment</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40">
                <SelectValue>{statusOptions.find(opt => opt.value === status)?.label || "All Statuses"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="p-6 text-center text-muted-foreground">Loading controls…</div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">{error}</div>
        ) : controls.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No controls found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-30">CODE</TableHead>
                <TableHead className="w-40">SECTION</TableHead>
                <TableHead className="w-48">CONTROL</TableHead>
                <TableHead>REQUIREMENTS</TableHead>
                <TableHead className="w-40">STATUS</TableHead>
                <TableHead className="w-30">TICKETS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((item, index) => (
                <TableRow key={item.controlId || item.code || index} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.section}</TableCell>
                  <TableCell className="font-medium">{item.control}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">{item.requirements}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
};

export default AIControlAssessment;
