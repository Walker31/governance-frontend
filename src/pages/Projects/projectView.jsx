import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Overview from './components/overview';
import ProjectRisks from './components/projectRisks';
import Frameworks from './components/frameworks';
import Settings from './components/settings';

const tabLabels = [
  "Overview",
  "Project risks",
  "Frameworks",
  "Settings"
];

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProjectView = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <div className="font-semibold text-2xl">AI Compliance Checker project view</div>
      <div className="text-gray-500 mb-6">
        This project includes all the governance process status of the AI Compliance Checker project.
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="project tabs"
          sx={{
            '& .MuiTab-root': { textTransform: 'none', minWidth: 120 },
            '& .Mui-selected': { color: '#10b981' }, // green-500
            '& .MuiTabs-indicator': { backgroundColor: '#10b981' }
          }}
        >
          {tabLabels.map((label, idx) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        {/* Overview Content */}
        <Overview/>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {/* Project risks Content */}
        <ProjectRisks/>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        {/* Frameworks Content */}
        <Frameworks/>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        {/* Settings Content */}
        <Settings/>
      </TabPanel>
    </div>
  );
};

export default ProjectView;
