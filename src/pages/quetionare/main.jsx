// File: Questionnaire.jsx
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  CircularProgress,
  Alert,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormHelperText,
  Container, // Added for better layout
  Paper,     // Added for the main form surface
  Typography, // Added for consistent text styling
  Divider    // Added to separate sections
} from '@mui/material';
import QuestionItem from './questionItem';
import OptionEditor from './optionEditor';
import { nanoid } from 'nanoid';
import questionnaireService from '../../services/questionnaireService';
import templateService from '../../services/templateService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DEFAULT_PROJECT_ID } from '../../constants/projectDefaults';

// --- Constants remain the same ---
const GENERAL_QUESTIONS = [
  {
    id: 'requestOwner',
    label: '1. Please enter your name or the name of the person for whom you are submitting this request and the country in which the request owner is located?',
    type: 'text',
    required: true,
    placeholder: 'Name, country...'
  },
  {
    id: 'projectType',
    label: '2. Is this project internal to our organization or does it involve any third parties?',
    type: 'radio',
    required: true,
    options: [
      { value: 'internal', label: 'Developing a product in-house' },
      { value: 'thirdparty', label: 'Adopting/integrating third party AI system' }
    ]
  },
  {
    id: 'region',
    label: '3. From which regions do you need data for your use-case?',
    type: 'text',
    required: true,
    placeholder: 'List regions...'
  },
  {
    id: 'purpose',
    label: '4. What is the intended purpose of your system?',
    type: 'textarea',
    required: true,
    placeholder: 'Describe the purpose...'
  },
  {
    id: 'dateRange',
    label: '5. What is the date range for when you would like to start and complete the project?',
    type: 'text',
    required: true,
    placeholder: 'e.g., September 2025 - December 31, 2025'
  },
  {
    id: 'delayFactors',
    label: '6. Are there any factors that might extend your project timeline?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe any potential delays...'
  }
];

const SUB_QUESTION_OPTIONS = {
  internal: [
    { value: 'ai-system', label: 'AI-System' },
    { value: 'cybersecurity', label: 'Cybersecurity Management system' }
  ],
  thirdparty: [
    { value: 'thirdparty-ai', label: 'Third-party AI-System' },
    { value: 'thirdparty-cyber', label: 'Third-party Cybersecurity' }
  ]
};
const SUB_QUESTION_LABEL = 'Please select the system type:';

const EXAMPLE_RESPONSE = {
  requestOwner: 'Priya Singh, India',
  projectType: 'thirdparty',
  region: 'India, United States, European Union',
  purpose: 'To automate document screening and risk analysis using artificial intelligence, aiming to improve operational efficiency, compliance, and data-driven insights.',
  dateRange: 'September 1, 2025 - December 31, 2025',
  delayFactors: 'Integration complexity, data partner delays, regulatory approval timelines.',
  subSystemType: 'thirdparty-ai'
};
const EXAMPLE_TEMPLATE_ANSWERS = [
  'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes. We perform annual security audits of all critical third-party partners; evidence can be provided upon request.', 'Yes', 'Yes', 'Annually', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Quarterly', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'
];


const Questionnaire = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // --- State and logic hooks remain the same ---
  const [responses, setResponses] = useState({});
  const [subSelection, setSubSelection] = useState('');
  const [templateQuestions, setTemplateQuestions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editDialog, setEditDialog] = useState({ open: false, index: null });
  const [addDialog, setAddDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [newQuestion, setNewQuestion] = useState({ type: 'text', label: '', options: [] });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateService.getTemplates();
        setTemplates(Array.isArray(data) ? data : []);
      } catch (err) {
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (!subSelection) {
      setTemplateQuestions([]);
      return;
    }
    let currentTemplateType = '';
    if (subSelection === 'ai-system') currentTemplateType = 'AI System';
    else if (subSelection === 'cybersecurity') currentTemplateType = 'Cybersecurity Management System';
    else if (subSelection === 'thirdparty-ai') currentTemplateType = 'Third-party AI System';
    else if (subSelection === 'thirdparty-cyber') currentTemplateType = 'Third-party Cybersecurity System';

    if (currentTemplateType) {
      const found = templates.find(t => t.templateType === currentTemplateType);
      if (found && found.questions) {
        setTemplateQuestions(found.questions.map((q, index) => ({
          id: q.id || index + 1,
          type: 'text',
          label: q.question,
          options: [],
          value: '',
          required: q.required !== false,
          placeholder: 'Enter your answer...'
        })));
      } else {
        setTemplateQuestions([]);
      }
    } else {
      setTemplateQuestions([]);
    }
  }, [subSelection, templates]);

  const handleGeneralChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
    if (id === 'projectType') {
      setSubSelection('');
      setTemplateQuestions([]);
    }
  };

  const handleSubSelection = (value) => {
    setSubSelection(value);
    setResponses(prev => ({ ...prev, subSystemType: value }));
  };

  const handleTemplateChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const loadExample = () => {
    let templateResponseMap = {};
    templateQuestions.forEach((q, idx) => {
      templateResponseMap[q.id] = EXAMPLE_TEMPLATE_ANSWERS[idx] || 'Yes';
    });
    setResponses({ ...EXAMPLE_RESPONSE, ...templateResponseMap });
    setSubSelection(EXAMPLE_RESPONSE.subSystemType);
    setSubmitAttempted(false);
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');
      for (const q of GENERAL_QUESTIONS) {
        if (q.required && !responses[q.id]) {
          setError('Please answer all required questions before submitting.');
          setIsSubmitting(false);
          return;
        }
      }
      if (responses.projectType && !subSelection) {
        setError('Please select the system type.');
        setIsSubmitting(false);
        return;
      }
      for (const q of templateQuestions) {
        if (q.required && !responses[q.id]) {
          setError('Please answer all required questions before submitting.');
          setIsSubmitting(false);
          return;
        }
      }

      let templateType = '';
      if (subSelection === 'ai-system') templateType = 'AI System';
      else if (subSelection === 'cybersecurity') templateType = 'Cybersecurity Management System';
      else if (subSelection === 'thirdparty-ai') templateType = 'Third-party AI System';
      else if (subSelection === 'thirdparty-cyber') templateType = 'Third-party Cybersecurity System';

      const questionnaireData = {
        questionnaireResponses: responses,
        projectId: DEFAULT_PROJECT_ID,
        useCaseType: templateType
      };
      await questionnaireService.processQuestionnaire(questionnaireData);
      setSuccess('Questionnaire submitted successfully! Risk analysis is being generated.');
      setTimeout(() => navigate(`/ai-risk-assessment`), 2000);
    } catch (error) {
      setError(error.message || 'Failed to submit questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setEditData({ ...templateQuestions[index] });
    setEditDialog({ open: true, index });
  };
  const handleEditSave = () => {
    const updated = [...templateQuestions];
    updated[editDialog.index] = { ...editData };
    setTemplateQuestions(updated);
    setEditDialog({ open: false, index: null });
  };
  const handleAdd = () => {
    setNewQuestion({ type: 'text', label: '', options: [] });
    setAddDialog(true);
  };
  const handleAddSave = () => {
    if (!newQuestion.label.trim()) return;
    setTemplateQuestions([...templateQuestions, { ...newQuestion, id: nanoid(), options: newQuestion.options || [], value: newQuestion.type === 'checkbox' ? [] : '' }]);
    setAddDialog(false);
  };

  const allGeneralAnswered = GENERAL_QUESTIONS.every(q => !q.required || !!responses[q.id]);
  const allSubAnswered = !responses.projectType || !!subSelection;
  const allTemplateAnswered = templateQuestions.every(q => !q.required || !!responses[q.id]);
  const allAnswered = allGeneralAnswered && allSubAnswered && allTemplateAnswered;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const showSubQuestionWarning = submitAttempted && responses.projectType && !subSelection;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Tooltip title="Go back">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1, ml: 1 }}>
          AI Use Case Questionnaire
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={loadExample}
          startIcon={<AutoFixHighIcon />}
          sx={{
            mr: 1,
            borderRadius: 2,
            fontWeight: 'bold',
            textTransform: 'none', // Keeps the original casing
            borderColor: 'secondary.light',
            '&:hover': {
              backgroundColor: 'secondary.lighter',
              borderColor: 'secondary.main',
            },
          }}
        >
          Load Example
        </Button>
        {isAdmin() && (
          <IconButton color="primary" onClick={handleAdd} aria-label="add question">
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Typography variant="h6" gutterBottom>General Information</Typography>
        <Divider sx={{ mb: 3 }} />

        {/* General questions */}
        {GENERAL_QUESTIONS.map((q) => {
          const showWarning = submitAttempted && q.required && !responses[q.id];

          if (q.type === 'radio') {
            return (
              <FormControl key={q.id} fullWidth margin="normal" error={showWarning}>
                <FormLabel>{q.label}</FormLabel>
                <RadioGroup
                  name={q.id}
                  value={responses[q.id] || ''}
                  onChange={e => handleGeneralChange(q.id, e.target.value)}
                >
                  {q.options.map(opt => (
                    <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
                  ))}
                </RadioGroup>
                {showWarning && <FormHelperText>This question is required.</FormHelperText>}
              </FormControl>
            );
          } else { // Handles 'text' and 'textarea'
            return (
              <TextField
                key={q.id}
                fullWidth
                margin="normal"
                variant="outlined"
                label={q.label}
                placeholder={q.placeholder}
                multiline={q.type === 'textarea'}
                rows={q.type === 'textarea' ? 3 : 1}
                value={responses[q.id] || ''}
                onChange={e => handleGeneralChange(q.id, e.target.value)}
                error={showWarning}
                helperText={showWarning ? 'This field is required.' : ''}
              />
            );
          }
        })}
        {/* Sub-question (system type) if projectType is selected */}
        {responses.projectType && (
          <FormControl fullWidth margin="normal" error={showSubQuestionWarning}>
            <FormLabel>{SUB_QUESTION_LABEL}</FormLabel>
            <RadioGroup
              name="subSystemType"
              value={subSelection}
              onChange={e => handleSubSelection(e.target.value)}
            >
              {SUB_QUESTION_OPTIONS[responses.projectType].map(opt => (
                <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
              ))}
            </RadioGroup>
            {showSubQuestionWarning && <FormHelperText>Please select the system type.</FormHelperText>}
          </FormControl>
        )}

        {/* Template questions */}
        {templateQuestions.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>System Specific Questions</Typography>
            <Divider sx={{ mb: 2 }} />
            {templateQuestions.map((q, idx) => {
              const showWarning = submitAttempted && q.required && !responses[q.id];
              return (
                <div key={q.id}>
                  <QuestionItem
                    q={q}
                    idx={idx}
                    onEdit={handleEdit}
                    value={responses[q.id]}
                    onChange={(val) => handleTemplateChange(q.id, val)}
                  />
                  {showWarning && (
                    <FormHelperText error sx={{ ml: 2, mb: 1 }}>This question is required.</FormHelperText>
                  )}
                </div>
              );
            })}
          </Box>
        )}

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting || !allAnswered}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ px: 5, py: 1.5, fontWeight: 'bold',borderRadius:10 }}
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </Button>
        </Box>
      </Paper>
      
      {/* --- Dialogs remain the same --- */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, index: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <TextField label="Question" fullWidth value={editData.label || ''} onChange={e => setEditData({ ...editData, label: e.target.value })} margin="normal" />
          {(editData.type === 'radio' || editData.type === 'checkbox') && (<OptionEditor options={editData.options || []} onChange={opts => setEditData({ ...editData, options: opts })} />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, index: null })}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField label="Question" fullWidth value={newQuestion.label} onChange={e => setNewQuestion({ ...newQuestion, label: e.target.value })} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={newQuestion.type} label="Type" onChange={e => setNewQuestion({ ...newQuestion, type: e.target.value, options: [] })}>
              {['text', 'textarea', 'radio', 'checkbox'].map(type => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
            </Select>
          </FormControl>
          {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') && (<OptionEditor options={newQuestion.options || []} onChange={opts => setNewQuestion({ ...newQuestion, options: opts })} />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Questionnaire;