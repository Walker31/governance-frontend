import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const reports = [
  {
    name: "Q2 2023 AI Compliance Report",
    type: "Compliance",
    date: "2023-06-30",
    status: "Completed"
  },
  {
    name: "AI Risk Assessment - Fraud Detection",
    type: "Risk Assessment",
    date: "2023-06-15",
    status: "Completed"
  },
  {
    name: "EU AI Act Readiness Assessment",
    type: "Compliance",
    date: "2023-05-22",
    status: "Completed"
  },
  {
    name: "AI Inventory Audit",
    type: "Audit",
    date: "2023-05-10",
    status: "Completed"
  },
  {
    name: "Q1 2023 AI Compliance Report",
    type: "Compliance",
    date: "2023-03-31",
    status: "Completed"
  }
];

const Report = () => {
  return (
    <div className="p-6">
      <div className="font-bold text-2xl mb-4">Reports</div>

      <div className="shadow-xl p-4 flex justify-between items-center bg-white rounded-lg mb-4">
        <div className="font-semibold text-lg">Available Reports</div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-2">
            <FileDownloadIcon fontSize="small" /> Export
          </button>
          <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md flex items-center gap-2">
            <FolderOpenIcon fontSize="small" /> Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="p-3 text-gray-500 text-sm font-medium">REPORT NAME</th>
              <th className="p-3 text-gray-500 text-sm font-medium">TYPE</th>
              <th className="p-3 text-gray-500 text-sm font-medium">DATE GENERATED</th>
              <th className="p-3 text-gray-500 text-sm font-medium">STATUS</th>
              <th className="p-3 text-gray-500 text-sm font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className=" hover:bg-gray-50 m-3">
                <td className="p-3">{report.name}</td>
                <td className="p-3">{report.type}</td>
                <td className="p-3">{report.date}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded-full">
                    {report.status}
                  </span>
                </td>
                <td className="p-3 text-blue-600 text-sm flex gap-4">
                  <button className="hover:underline">View</button>
                  <button className="hover:underline">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
