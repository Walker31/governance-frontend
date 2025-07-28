import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const owners = ["VerifyWise Admin"];
const regulations = ["ISO 42001", "EU AI Act"];
const teamMembers = ["Alice Smith", "John Doe", "VerifyWise Admin"];
const riskLevels = ["High risk", "Medium risk", "Low risk"];
const highRiskRoles = ["Deployer", "Developer", "Operator"];

const NewProjectModal = ({ open, onClose, onCreate, suggestFrom }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [owner, setOwner] = useState(owners[0]);
  const [selectedRegulations, setSelectedRegulations] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [riskLevel, setRiskLevel] = useState(riskLevels[0]);
  const [highRiskRole, setHighRiskRole] = useState(highRiskRoles[0]);

  // Optionally pre-fill fields based on suggestFrom (existing project)
  React.useEffect(() => {
    if (suggestFrom) {
      setProjectTitle(suggestFrom.title || "");
      setGoal(suggestFrom.goal || "");
      setOwner(suggestFrom.owner || owners[0]);
      setSelectedRegulations(suggestFrom.regulations || []);
      setStartDate(suggestFrom.startDate ? dayjs(suggestFrom.startDate) : dayjs());
      setSelectedMembers(suggestFrom.members || []);
      setRiskLevel(suggestFrom.riskLevel || riskLevels[0]);
      setHighRiskRole(suggestFrom.highRiskRole || highRiskRoles[0]);
    }
  }, [suggestFrom]);

  const handleCreate = () => {
    onCreate && onCreate({
      title: projectTitle,
      goal,
      owner,
      regulations: selectedRegulations,
      startDate: startDate.format("YYYY-MM-DD"),
      members: selectedMembers,
      riskLevel,
      highRiskRole
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <form className="flex flex-col gap-6">
            <TextField label="Project title *" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} fullWidth />
            <TextField label="Goal *" value={goal} onChange={e => setGoal(e.target.value)} multiline rows={3} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Owner *</InputLabel>
              <Select value={owner} onChange={e => setOwner(e.target.value)} label="Owner *">
                {owners.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Monitored regulations and standards *</InputLabel>
              <Select
                multiple
                value={selectedRegulations}
                onChange={e => setSelectedRegulations(e.target.value)}
                input={<OutlinedInput label="Monitored regulations and standards *" />}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {selected.map(value => <Chip key={value} label={value} />)}
                  </Box>
                )}
              >
                {regulations.map(reg => <MenuItem key={reg} value={reg}>{reg}</MenuItem>)}
              </Select>
              <div className="text-xs text-gray-500 mt-1">Add all monitored regulations and standards of the project.</div>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start date *"
                value={startDate}
                onChange={setStartDate}
                format="MM/DD/YYYY"
                slotProps={{
                  textField: { fullWidth: true, InputProps: { startAdornment: <CalendarTodayIcon fontSize="small" className="mr-2" /> } }
                }}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Team members *</InputLabel>
              <Select
                multiple
                value={selectedMembers}
                onChange={e => setSelectedMembers(e.target.value)}
                input={<OutlinedInput label="Team members *" />}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {selected.map(value => <Chip key={value} label={value} />)}
                  </Box>
                )}
              >
                {teamMembers.map(member => <MenuItem key={member} value={member}>{member}</MenuItem>)}
              </Select>
              <div className="text-xs text-gray-500 mt-1">Add all team members of the project. Only those who are added will be able to see the project.</div>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Risk level *</InputLabel>
              <Select value={riskLevel} onChange={e => setRiskLevel(e.target.value)} label="Risk level *">
                {riskLevels.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>High risk role *</InputLabel>
              <Select value={highRiskRole} onChange={e => setHighRiskRole(e.target.value)} label="High risk role *">
                {highRiskRoles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
              </Select>
            </FormControl>
          </form>
        </div>
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleCreate} variant="contained" disabled={!projectTitle || !goal || !selectedMembers.length}>Create Project</Button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal; 