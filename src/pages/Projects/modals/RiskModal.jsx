import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const RiskModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    riskName: "",
    riskOwner: "",
    severity: 3, // Default to Medium
    mitigation: "",
    targetDate: null,
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, targetDate: newValue }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.riskName || !formData.riskOwner || !formData.mitigation) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    onSave(formData);
    // Reset form for next time
    setFormData({ riskName: "", riskOwner: "", severity: 3, mitigation: "", targetDate: null });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Add New Risk</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Risk Name"
              name="riskName"
              value={formData.riskName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Risk Owner"
              name="riskOwner"
              value={formData.riskOwner}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Severity</InputLabel>
              <Select
                name="severity"
                value={formData.severity}
                label="Severity"
                onChange={handleChange}
              >
                <MenuItem value={5}>5 (Critical)</MenuItem>
                <MenuItem value={4}>4 (High)</MenuItem>
                <MenuItem value={3}>3 (Medium)</MenuItem>
                <MenuItem value={2}>2 (Low)</MenuItem>
                <MenuItem value={1}>1 (Very Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mitigation Plan"
              name="mitigation"
              value={formData.mitigation}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Target Date"
                value={formData.targetDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save Risk
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RiskModal;