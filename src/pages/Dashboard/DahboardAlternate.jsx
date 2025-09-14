import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Search,
  Plus,
  Settings,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ✅ Import services (real backend fetch)
import {
  getProjects,
  updateProjectStatus,
} from "@/services/projectService";

// ---------------- UI HELPERS ----------------
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "in progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "pending approval":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "open":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const chartConfig = {
  value: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
};

// ---------------- MAIN COMPONENT ----------------
const DashAlt = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ Fetch projects from backend
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to fetch projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      // ✅ Optimistic UI update
      setProjects((prev) =>
        prev.map((p) =>
          p.projectId === projectId ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error("Failed to update project status:", err);
    }
  };

  // ✅ Search filter
  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Dynamic Status Data for Chart
  const dynamicStatusData = Object.values(
    filteredProjects.reduce((acc, project) => {
      const statusName = project.status;
      if (!acc[statusName]) {
        acc[statusName] = { name: statusName, value: 0 };
      }
      acc[statusName].value++;
      return acc;
    }, {})
  );

  // ⚠️ Aging chart still static unless you have `createdAt` field in API
  const agingData = [
    { months: "0-3", value: 6 },
    { months: "4-6", value: 4 },
    { months: "7-9", value: 2 },
    { months: "10-12", value: 5 },
    { months: "12+", value: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects and assessments
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dynamicStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Aging Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aging</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={agingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="months" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Issues Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Issues</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[200px]">
              <p className="text-muted-foreground">No Data</p>
            </CardContent>
          </Card>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search Projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Advanced Search</Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Columns
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Workflow</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading projects...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-destructive">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.projectId}>
                    <TableCell className="font-medium">{project.projectId}</TableCell>
                    <TableCell>
                      <button onClick={() => navigate(`/projects/${project.projectId}`)} className="text-primary hover:underline">
                        {project.projectName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.workflow}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {project.template}
                    </TableCell>
                    <TableCell>
                      <button className="text-primary hover:underline">
                        {project.owner?.name}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(project.projectId, "Open")}
                          >
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(project.projectId, "In Progress")}
                          >
                            In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(project.projectId, "Pending Approval")}
                          >
                            Pending Approval
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(project.projectId, "Approved")}
                          >
                            Approved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default DashAlt;
