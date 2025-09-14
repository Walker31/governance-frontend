import React, { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import controlService from "@/services/controlService";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "Compliant", label: "Compliant" },
  { value: "In Progress", label: "In Progress" },
  { value: "Planned", label: "Planned" },
  { value: "Not Performed", label: "Not Performed" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

const dropdownStatusOptions = [
  "Pending",
  "Approved",
  "Rejected",
  "In Progress",
  "Compliant",
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Compliant":
    case "Approved":
      return (
        <Badge className="bg-green-600 text-white hover:bg-green-700">
          {status}
        </Badge>
      );
    case "In Progress":
      return (
        <Badge className="bg-yellow-600 text-white hover:bg-yellow-700">
          In Progress
        </Badge>
      );
    case "Planned":
      return (
        <Badge className="bg-blue-600 text-white hover:bg-blue-700">
          Planned
        </Badge>
      );
    case "Not Performed":
    case "Rejected":
      return (
        <Badge className="bg-red-600 text-white hover:bg-red-700">
          {status}
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-gray-500 text-white hover:bg-gray-600">
          Pending
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const AIControlAssessment = () => {
  const [controls, setControls] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchControls = async () => {
      setLoading(true);
      setError("");
      try {
        // Pagination defaults
        const page = 1,
          limit = 50;
        const params = { page, limit };
        if (status && status !== "all") params.status = status;

        const result = await controlService.getControlsBySystemType('AI',params);

        setControls(result.controls || []);
      } catch (e) {
        setError(e.message || "Failed to load controls");
        setControls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchControls();
  }, [status]);

  const handleStatusChange = (controlCode, newStatus) => {
    setControls((prevControls) =>
      prevControls.map((control) =>
        control.code === controlCode
          ? { ...control, status: newStatus }
          : control
      )
    );
    // In a real application, you would also make an API call here to persist the change.
    // e.g., controlService.updateControl(controlCode, { status: newStatus });
    console.log(`Updated control ${controlCode} to status ${newStatus}`);
  };

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
                <SelectValue>
                  {statusOptions.find((opt) => opt.value === status)?.label ||
                    "All Statuses"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="p-6 text-center text-muted-foreground">
            Loading controls…
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">{error}</div>
        ) : controls.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No controls found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-30">CODE</TableHead>
                <TableHead className="w-40">SECTION</TableHead>
                <TableHead className="w-48">CONTROL</TableHead>
                <TableHead>REQUIREMENTS</TableHead>
                <TableHead>RISK ASSOCIATED</TableHead>
                <TableHead className="w-40">STATUS</TableHead>
                <TableHead className="w-30">TICKETS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((item) => (
                <TableRow key={item.code} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">
                    {item.code}
                  </TableCell>
                  <TableCell className="font-medium">{item.section}</TableCell>
                  <TableCell className="font-medium">{item.control}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">
                    {item.requirements}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.relatedRisks}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          {getStatusBadge(item.status)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {dropdownStatusOptions.map((dropdownStatus) => (
                          <DropdownMenuItem
                            key={dropdownStatus}
                            onSelect={() =>
                              handleStatusChange(item.code, dropdownStatus)
                            }
                            disabled={item.status === dropdownStatus}
                          >
                            {dropdownStatus}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
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
