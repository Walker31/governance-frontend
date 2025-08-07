// File: Questionnaire.jsx
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
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
  Tooltip
} from '@mui/material';
import QuestionItem from './questionItem';
import OptionEditor from './optionEditor';
import { nanoid } from 'nanoid';
import questionnaireService from '../../services/questionnaireService';
import templateService from '../../services/templateService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DEFAULT_PROJECT_ID } from '../../constants/projectDefaults';

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
    label: '5. Select a date range for when you would like to start and complete the project?',
    type: 'daterange',
    required: true
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

const Questionnaire = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // State for all answers
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
  const [newQuestion, setNewQuestion] = useState({
    type: 'text',
    label: '',
    options: []
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Load templates on mount
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

  // When subSelection changes, load template questions
  useEffect(() => {
    if (!subSelection) {
      setTemplateQuestions([]);
      return;
    }
    // Map subSelection to templateType
    let templateType = '';
    if (subSelection === 'ai-system') templateType = 'AI System';
    else if (subSelection === 'cybersecurity') templateType = 'Cybersecurity Management System';
    else if (subSelection === 'thirdparty-ai') templateType = 'Third-party AI System';
    else if (subSelection === 'thirdparty-cyber') templateType = 'Third-party Cybersecurity System';
    if (templateType) {
      const found = templates.find(t => t.templateType === templateType);
      if (found && found.questions) {
        setTemplateQuestions(found.questions.map((q, index) => ({
          id: q.id || index + 1,
          type: q.responseType === 'text' ? 'textarea' :
                q.responseType === 'numeric' ? 'text' :
                q.responseType === 'mcq' ? 'radio' :
                q.responseType === 'msq' ? 'checkbox' :
                q.responseType === 'boolean' ? 'radio' : 'text',
          label: q.question,
          options: q.responseType === 'boolean' ? ['Yes', 'No'] : (q.options || []),
          value: q.responseType === 'checkbox' ? [] : '',
          required: q.required !== false,
          placeholder: q.responseType === 'text' ? 'Enter your answer...' : ''
        })));
      } else {
        setTemplateQuestions([]);
      }
    } else {
      setTemplateQuestions([]);
    }
  }, [subSelection, templates]);

  // Handle general question responses
  const handleGeneralChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
    // If projectType changes, reset subSelection and template questions
    if (id === 'projectType') {
      setSubSelection('');
      setTemplateQuestions([]);
    }
  };

  // Handle sub-question selection
  const handleSubSelection = (value) => {
    setSubSelection(value);
    setResponses(prev => ({ ...prev, subSystemType: value }));
  };

  // Handle template question responses
  const handleTemplateChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  // Submission
  const handleSubmit = async () => {
    setSubmitAttempted(true);
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');
      // Validate required general questions
      for (const q of GENERAL_QUESTIONS) {
        if (q.required) {
          if (q.id === 'dateRange') {
            if (!responses.startDate || !responses.endDate) {
              setError('Please answer all required questions before submitting.');
              setIsSubmitting(false);
              return;
            }
          } else if (!responses[q.id]) {
            setError('Please answer all required questions before submitting.');
            setIsSubmitting(false);
            return;
          }
        }
      }
      // Validate sub-question if projectType is answered
      if (responses.projectType && !subSelection) {
        setError('Please select the system type.');
        setIsSubmitting(false);
        return;
      }
      // Validate required template questions
      for (const q of templateQuestions) {
        if (q.required && !responses[q.id]) {
          setError('Please answer all required questions before submitting.');
          setIsSubmitting(false);
          return;
        }
      }
      // Prepare data
      const questionnaireData = {
        questionnaireResponses: responses,
        projectId: DEFAULT_PROJECT_ID,
        useCaseType: 'human'
      };
      await questionnaireService.processQuestionnaire(questionnaireData);
      setSuccess('Questionnaire submitted successfully! Risk analysis is being generated.');
      setTimeout(() => {
        navigate(`/ai-risk-assessment`);
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to submit questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit and add question logic (unchanged)
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
    setTemplateQuestions([
      ...templateQuestions,
      {
        ...newQuestion,
        id: nanoid(),
        options: newQuestion.options || [],
        value: newQuestion.type === 'checkbox' ? [] : ''
      }
    ]);
    setAddDialog(false);
  };

  // Compute if all required questions are answered
  const allGeneralAnswered = GENERAL_QUESTIONS.every(q => {
    if (!q.required) return true;
    if (q.id === 'dateRange') {
      return responses.startDate && responses.endDate;
    }
    return responses[q.id];
  });
  const allSubAnswered = !responses.projectType || !!subSelection;
  const allTemplateAnswered = templateQuestions.every(q => !q.required || responses[q.id]);
  const allAnswered = allGeneralAnswered && allSubAnswered && allTemplateAnswered;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-3 items-center p-4">
        <Tooltip title="Go back">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: 'blue' }} />
          </IconButton>
        </Tooltip>
        <div className="font-bold text-lg flex-1">
          {'AI Use Case Questionnaire'}
        </div>
        {isAdmin() && (
          <IconButton color="primary" onClick={handleAdd} aria-label="add question">
            <AddIcon />
          </IconButton>
        )}
      </div>
      <div className="shadow-xl min-h-screen border-1 bg-white p-6 rounded-md mx-auto">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {/* General questions */}
        {GENERAL_QUESTIONS.map((q, idx) => {
          let showWarning = false;
          if (submitAttempted && q.required) {
            if (q.id === 'dateRange') {
              showWarning = !responses.startDate || !responses.endDate;
            } else {
              showWarning = !responses[q.id];
            }
          }
          if (q.type === 'radio') {
            return (
              <div key={q.id} className="mb-6">
                <label className="block font-medium mb-2">{q.label}</label>
                {q.options.map(opt => (
                  <label key={opt.value} className="flex items-center mb-1">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={responses[q.id] === opt.value}
                      onChange={e => handleGeneralChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {opt.label}
                  </label>
                ))}
                {showWarning && (
                  <div style={{ color: 'red', fontSize: '0.95em', marginTop: 2 }}>This question is required.</div>
                )}
              </div>
            );
          } else if (q.type === 'daterange') {
            return (
              <div key={q.id} className="mb-6">
                <label className="block font-medium mb-2">{q.label}</label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    value={responses.startDate || ''}
                    onChange={e => setResponses(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="date"
                    value={responses.endDate || ''}
                    onChange={e => setResponses(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                </div>
                {showWarning && (
                  <div style={{ color: 'red', fontSize: '0.95em', marginTop: 2 }}>Both dates are required.</div>
                )}
              </div>
            );
          } else if (q.type === 'textarea') {
            return (
              <div key={q.id} className="mb-6">
                <label className="block font-medium mb-2">{q.label}</label>
                <textarea
                  value={responses[q.id] || ''}
                  onChange={e => handleGeneralChange(q.id, e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  rows={3}
                  placeholder={q.placeholder}
                />
                {showWarning && (
                  <div style={{ color: 'red', fontSize: '0.95em', marginTop: 2 }}>This question is required.</div>
                )}
              </div>
            );
          } else {
            return (
              <div key={q.id} className="mb-6">
                <label className="block font-medium mb-2">{q.label}</label>
                <input
                  type="text"
                  value={responses[q.id] || ''}
                  onChange={e => handleGeneralChange(q.id, e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  placeholder={q.placeholder}
                />
                {showWarning && (
                  <div style={{ color: 'red', fontSize: '0.95em', marginTop: 2 }}>This question is required.</div>
                )}
              </div>
            );
          }
        })}
        {/* Sub-question (system type) if projectType is selected */}
        {responses.projectType && (
          <div className="mb-6">
            <label className="block font-medium mb-2">{SUB_QUESTION_LABEL}</label>
            {SUB_QUESTION_OPTIONS[responses.projectType].map(opt => (
              <label key={opt.value} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="subSystemType"
                  value={opt.value}
                  checked={subSelection === opt.value}
                  onChange={e => handleSubSelection(e.target.value)}
                  className="mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
        {/* Template questions */}
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
                <div style={{ color: 'red', fontSize: '0.95em', marginTop: 2, marginBottom: 8 }}>This question is required.</div>
              )}
            </div>
          );
        })}
        <Box mt={4} display="flex" justifyContent="center">
          <Button 
            variant="contained" 
            color="primary" 
            size="medium"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              boxShadow: 1,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              transition: 'background 0.2s',
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: 3
              }
            }}
            onClick={handleSubmit}
            disabled={isSubmitting || !allAnswered}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </Button>
        </Box>
      </div>
      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, index: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            value={editData.label || ''}
            onChange={e => setEditData({ ...editData, label: e.target.value })}
            margin="normal"
          />
          {(editData.type === 'radio' || editData.type === 'checkbox') && (
            <OptionEditor options={editData.options || []} onChange={opts => setEditData({ ...editData, options: opts })} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, index: null })}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Add Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            value={newQuestion.label}
            onChange={e => setNewQuestion({ ...newQuestion, label: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={newQuestion.type}
              label="Type"
              onChange={e => setNewQuestion({ ...newQuestion, type: e.target.value, options: [] })}
            >
              {['text','textarea','radio','checkbox'].map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') && (
            <OptionEditor options={newQuestion.options || []} onChange={opts => setNewQuestion({ ...newQuestion, options: opts })} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Questionnaire;
