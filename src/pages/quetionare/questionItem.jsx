// File: components/QuestionItem.jsx
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const QuestionItem = ({
  q,
  idx,
  onEdit,
  value,
  onChange
}) => {
  // For checkbox group, handle array of checked values
  const handleCheckboxChange = (option) => (event) => {
    if (event.target.checked) {
      onChange([...(value || []), option]);
    } else {
      onChange((value || []).filter((v) => v !== option));
    }
  };

  // For date-range type
  const handleDateChange = (field) => (event) => {
    onChange({ ...value, [field]: event.target.value });
  };

  return (
    <Box key={q.id} mb={3} display="flex" alignItems="flex-start" gap={1}>
      <Box flex={1}>
        <Typography fontWeight={500} mb={1}>
          {idx + 1}. {q.label}
        </Typography>

        {q.type === 'text-country' && (
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full name"
                variant="outlined"
                fullWidth
                size="small"
                value={value?.name || ''}
                onChange={e => onChange({ ...value, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Select country</InputLabel>
                <Select
                  label="Select country"
                  value={value?.country || ''}
                  onChange={e => onChange({ ...value, country: e.target.value })}
                >
                  {q.fields?.[1]?.options?.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {q.type === 'text' && (
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
        )}

        {q.type === 'textarea' && (
          <TextField
            placeholder={q.placeholder || ''}
            multiline
            minRows={2}
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
        )}

        {q.type === 'radio' && (
          <RadioGroup
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
            ))}
          </RadioGroup>
        )}

        {q.type === 'checkbox' && (
          <FormGroup row>
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={Array.isArray(value) ? value.includes(opt) : false}
                    onChange={handleCheckboxChange(opt)}
                  />
                }
                label={opt}
              />
            ))}
          </FormGroup>
        )}

        {q.type === 'radio-text' && (
          <>
            <RadioGroup
              value={value?.choice || ''}
              onChange={e => onChange({ ...value, choice: e.target.value })}
            >
              {q.options.map((opt, i) => (
                <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
            <TextField
              placeholder="Please provide additional details"
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              value={value?.text || ''}
              onChange={e => onChange({ ...value, text: e.target.value })}
            />
          </>
        )}

        {q.type === 'checkbox-text' && (
          <>
            <FormGroup row>
              {q.options.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={Array.isArray(value?.choices) ? value.choices.includes(opt) : false}
                      onChange={event => {
                        const newChoices = Array.isArray(value?.choices) ? [...value.choices] : [];
                        if (event.target.checked) {
                          newChoices.push(opt);
                        } else {
                          const idx = newChoices.indexOf(opt);
                          if (idx > -1) newChoices.splice(idx, 1);
                        }
                        onChange({ ...value, choices: newChoices });
                      }}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
            <TextField
              placeholder="Please provide additional details"
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              value={value?.text || ''}
              onChange={e => onChange({ ...value, text: e.target.value })}
            />
          </>
        )}

        {q.type === 'date-range' && (
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Desired Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                value={value?.start || ''}
                onChange={handleDateChange('start')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Target Completion Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                value={value?.end || ''}
                onChange={handleDateChange('end')}
              />
            </Grid>
          </Grid>
        )}
      </Box>

      <IconButton size="small" onClick={() => onEdit(idx)} aria-label="edit question">
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuestionItem;
