import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// These can be fetched from a user directory in a real app
const owners = ["VerifyWise Admin", "Admin User"];
const teamMembers = ["Alice Smith", "John Doe", "VerifyWise Admin", "Admin User"];

// Static options
const regulations = ["ISO 42001", "EU AI Act"];
const riskLevels = ["High risk", "Medium risk", "Low risk"];
const highRiskRoles = ["Deployer", "Developer", "Operator"];


// The component now accepts the 'project' object as a prop
const Settings = ({ project }) => {
  // Initialize state with empty values
  const [projectTitle, setProjectTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [owner, setOwner] = useState("");
  const [selectedRegulations, setSelectedRegulations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [riskLevel, setRiskLevel] = useState("High risk");
  const [highRiskRole, setHighRiskRole] = useState("Deployer");

  // Use useEffect to populate the form when the project prop is available
  useEffect(() => {
    if (project) {
      console.log(project);
      setProjectTitle(project.projectId || "");
      setGoal(project.projectName || "");
      setOwner(project.owner?.name || "");
      setStartDate(project.createdAt ? dayjs(project.createdAt) : null);
      
      // Keep static values for fields not in the project data
      setSelectedRegulations(regulations);
      setSelectedMembers(teamMembers);
    }
  }, [project]); // This effect runs when the 'project' prop changes

  return (
    <div className="max-w-2xl py-4">
      <form className="flex flex-col gap-6">
        {/* Project Title */}
        <TextField
          label="Project title *"
          value={projectTitle}
          onChange={e => setProjectTitle(e.target.value)}
          fullWidth
        />

        {/* Goal */}
        <TextField
          label="Goal *"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        {/* Owner */}
        <FormControl fullWidth>
          <InputLabel>Owner *</InputLabel>
          <Select
            value={owner}
            onChange={e => setOwner(e.target.value)}
            label="Owner *"
          >
            {owners.map(o => (
              <MenuItem key={o} value={o}>{o}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Monitored regulations */}
        <FormControl fullWidth>
          <InputLabel>Monitored regulations and standards *</InputLabel>
          <Select
            multiple
            value={selectedRegulations}
            onChange={e => setSelectedRegulations(e.target.value)}
            input={<OutlinedInput label="Monitored regulations and standards *" />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {regulations.map(reg => (
              <MenuItem key={reg} value={reg}>{reg}</MenuItem>
            ))}
          </Select>
          <div className="text-xs text-gray-500 mt-1">
            Add all monitored regulations and standards of the project.
          </div>
        </FormControl>

        {/* Start Date */}
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

        {/* Team Members */}
        <FormControl fullWidth>
          <InputLabel>Team members *</InputLabel>
          <Select
            multiple
            value={selectedMembers}
            onChange={e => setSelectedMembers(e.target.value)}
            input={<OutlinedInput label="Team members *" />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {teamMembers.map(member => (
              <MenuItem key={member} value={member}>{member}</MenuItem>
            ))}
          </Select>
          <div className="text-xs text-gray-500 mt-1">
            Add all team members of the project. Only those who are added will be able to see the project.
          </div>
        </FormControl>

        {/* AI Risk Classification */}
        <div>
          <div className="text-gray-700 font-medium mb-1">AI risk classification</div>
          <div className="text-sm text-blue-600 mb-2">
            To define the AI risk classification, <a href="#" className="underline">please see this link</a>
          </div>
          <FormControl fullWidth>
            <Select
              value={riskLevel}
              onChange={e => setRiskLevel(e.target.value)}
            >
              {riskLevels.map(level => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* High Risk Role */}
        <div>
          <div className="text-gray-700 font-medium mb-1">Type of high risk role</div>
          <div className="text-sm text-blue-600 mb-2">
            If you are not sure about the high risk role, <a href="#" className="underline">please see this link</a>
          </div>
          <FormControl fullWidth>
            <Select
              value={highRiskRole}
              onChange={e => setHighRiskRole(e.target.value)}
            >
              {highRiskRoles.map(role => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Delete Project */}
        <div className="mt-8 border-t pt-6">
          <div className="text-red-700 font-semibold mb-2">Delete project</div>
          <div className="text-gray-500 text-sm mb-4">
            Note that deleting a project will remove all data related to that project from our system. This is permanent and non-recoverable.
          </div>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ textTransform: "none" }}
          >
            Delete project
          </Button>
        </div>

        {/* Save Button (disabled) */}
        <div className="flex justify-end">
          <Button variant="outlined" disabled>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;