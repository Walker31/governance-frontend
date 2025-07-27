import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

const riskSummary = [
  { label: "Very High", color: "red", count: 0 },
  { label: "High", color: "orange", count: 0 },
  { label: "Medium", color: "amber", count: 1 },
  { label: "Low", color: "green", count: 0 },
  { label: "Very Low", color: "teal", count: 0 },
];

const risks = [
  {
    name: "Data Privacy Compliance",
    owner: "VerifyWise Admin",
    severity: "Minor",
    likelihood: "Possible",
    mitigation: "In Progress",
    status: "Requires Review",
    riskLevel: "Medium Risk",
    riskLevelColor: "bg-amber-400 text-amber-900",
    targetDate: "24 July 2025",
  },
];

const ProjectRisks = () => {
  return (
    <div className="p-8">
      {/* Risk Summary Bar */}
      <div className="border border-gray-200 rounded-lg px-8 py-4 mb-8 bg-white flex justify-between items-center max-w-4xl mx-auto">
        {riskSummary.map((risk) => (
          <div key={risk.label} className="flex flex-col items-center flex-1">
            <div className={`font-medium text-${risk.color}-500`}>{risk.label}</div>
            <div className={`text-2xl font-bold text-${risk.color}-800`}>{risk.count}</div>
          </div>
        ))}
      </div>

      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Project risks</div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#059669",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#047857" },
            borderRadius: "6px",
            boxShadow: "none",
          }}
        >
          Add new risk
        </Button>
      </div>

      {/* Risks Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-gray-500 font-medium">RISK NAME</th>
              <th className="px-4 py-3 text-gray-500 font-medium">OWNER</th>
              <th className="px-4 py-3 text-gray-500 font-medium">SEVERITY</th>
              <th className="px-4 py-3 text-gray-500 font-medium">LIKELIHOOD</th>
              <th className="px-4 py-3 text-gray-500 font-medium">MITIGATION</th>
              <th className="px-4 py-3 text-gray-500 font-medium">STATUS</th>
              <th className="px-4 py-3 text-gray-500 font-medium">RISK LEVEL</th>
              <th className="px-4 py-3 text-gray-500 font-medium">TARGET DATE</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{risk.name}</td>
                <td className="px-4 py-3">{risk.owner}</td>
                <td className="px-4 py-3">{risk.severity}</td>
                <td className="px-4 py-3">{risk.likelihood}</td>
                <td className="px-4 py-3">{risk.mitigation}</td>
                <td className="px-4 py-3">{risk.status}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded font-semibold ${risk.riskLevelColor}`}>
                    {risk.riskLevel}
                  </span>
                </td>
                <td className="px-4 py-3">{risk.targetDate}</td>
                <td className="px-4 py-3">
                  <SettingsIcon className="text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Table Footer */}
        <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 bg-gray-50 rounded-b-lg">
          <div>
            Showing 1 - {risks.length} of {risks.length} project risk(s)
          </div>
          <div className="flex items-center gap-2">
            <span>Project risks per page</span>
            <select className="border rounded px-2 py-1">
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
            <span>Page 1 of 1</span>
            <button disabled className="text-gray-300 px-1">&lt;&lt;</button>
            <button disabled className="text-gray-300 px-1">&lt;</button>
            <button disabled className="text-gray-300 px-1">&gt;</button>
            <button disabled className="text-gray-300 px-1">&gt;&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRisks;
