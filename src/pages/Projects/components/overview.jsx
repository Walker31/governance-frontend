import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";

// The component now accepts the 'project' object as a prop
const Overview = ({ project }) => {
  // Data for progress bars (remains static for now)
  const euSubcontrols = { completed: 27, total: 100 };
  const euAssessments = { completed: 20, total: 70 };
  const isoClauses = { completed: 2, total: 24 };
  const isoAnnexes = { completed: 4, total: 37 };
  // Helper to calculate percentage
  const percent = (completed, total) =>
    total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Helper to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* --- Info Cards (Now Dynamic) --- */}
      <div className="flex flex-wrap gap-6">
        <div className="flex gap-6">
          <div className="border border-gray-200 p-4 w-80 rounded-lg bg-white">
            <div className="text-gray-400 text-sm">Owner</div>
            <div className="font-semibold">{project?.owner?.name || 'N/A'}</div>
          </div>
          <div className="border border-gray-200 p-4 w-80 rounded-lg bg-white">
            <div className="text-gray-400 text-sm">Last Updated</div>
            <div className="font-semibold">{formatDate(project?.updatedAt)}</div>
          </div>
          <div className="border border-gray-200 p-4 w-80 rounded-lg bg-white">
            <div className="text-gray-400 text-sm">Last Updated by</div>
            {/* Assuming the owner is the last person to update, as this data isn't in the JSON */}
            <div className="font-semibold">{project?.owner?.name || 'N/A'}</div>
          </div>
        </div>
        <div className="flex justify-between gap-12">
          <div className="border border-gray-200 p-4 w-max rounded-lg bg-white">
            <div className="text-gray-400 text-sm">Goal</div>
            {/* Using projectName as the goal, as it's descriptive */}
            <div className="">{project?.projectName || 'No goal specified.'}</div>
          </div>
          <div className="border border-gray-200 p-4 w-80 rounded-lg bg-white">
            <div className="text-gray-400 text-sm">Team Members</div>
             {/* This data is not in the JSON, so using a placeholder */}
            <div className="">No additional members assigned</div>
          </div>
        </div>
      </div>

      {/* --- Completion Status (Remains Static) --- */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* EU AI Act */}
        <div className="flex-1">
          <div className="font-medium mb-2">EU AI Act Completion Status</div>
          <div className="border border-gray-300 p-4 rounded-lg bg-white flex flex-col gap-6">
            {/* Subcontrols */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <LinearProgress
                  variant="determinate"
                  value={percent(euSubcontrols.completed, euSubcontrols.total)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#2563eb" }, // blue-600
                  }}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {euSubcontrols.completed} Subcontrols out of {euSubcontrols.total} completed
                  </span>
                </div>
              </div>
              <div className="w-12 text-right font-semibold">
                {percent(euSubcontrols.completed, euSubcontrols.total)}%
              </div>
            </div>
            {/* Assessments */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <LinearProgress
                  variant="determinate"
                  value={percent(euAssessments.completed, euAssessments.total)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#10b981" }, // green-500
                  }}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {euAssessments.completed} Assessments out of {euAssessments.total} completed
                  </span>
                </div>
              </div>
              <div className="w-12 text-right font-semibold">
                {percent(euAssessments.completed, euAssessments.total)}%
              </div>
            </div>
          </div>
        </div>

        {/* ISO 42001 */}
        <div className="flex-1">
          <div className="font-medium mb-2">ISO 42001 Completion Status</div>
          <div className="border border-gray-300 p-4 rounded-lg bg-white flex flex-col gap-6">
            {/* Clauses */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <LinearProgress
                  variant="determinate"
                  value={percent(isoClauses.completed, isoClauses.total)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#f59e42" }, // orange
                  }}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {isoClauses.completed} Clauses out of {isoClauses.total} completed
                  </span>
                </div>
              </div>
              <div className="w-12 text-right font-semibold">
                {percent(isoClauses.completed, isoClauses.total)}%
              </div>
            </div>
            {/* Annexes */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <LinearProgress
                  variant="determinate"
                  value={percent(isoAnnexes.completed, isoAnnexes.total)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#ef4444" }, // red-500
                  }}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {isoAnnexes.completed} Annexes out of {isoAnnexes.total} completed
                  </span>
                </div>
              </div>
              <div className="w-12 text-right font-semibold">
                {percent(isoAnnexes.completed, isoAnnexes.total)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* --- Project Risks (Remains Static) --- */}
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold">Project risks</div>

        <div className="border border-gray-400 p-4 w-150 flex justify-between rounded-lg bg-white">
          {/* Very High */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-red-500 font-semibold">Very High</div>
            <div className="text-red-800 text-lg font-bold">0</div>
          </div>
          {/* Divider */}
          <div className="w-px bg-gray-200 mx-2"></div>
          {/* High */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-orange-500 font-semibold">High</div>
            <div className="text-orange-800 text-lg font-bold">0</div>
          </div>
          <div className="w-px bg-gray-200 mx-2"></div>
          {/* Medium */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-amber-500 font-semibold">Medium</div>
            <div className="text-amber-800 text-lg font-bold">1</div>
          </div>
          <div className="w-px bg-gray-200 mx-2"></div>
          {/* Low */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-green-500 font-semibold">Low</div>
            <div className="text-green-800 text-lg font-bold">0</div>
          </div>
          <div className="w-px bg-gray-200 mx-2"></div>
          {/* Very Low */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-teal-500 font-semibold">Very Low</div>
            <div className="text-teal-800 text-lg font-bold">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;