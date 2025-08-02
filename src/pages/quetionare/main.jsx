// File: Questionnaire.jsx
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import yaml from 'js-yaml'
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
import { defaultQuestions, QUESTION_TYPES } from '../../constants/questions';
import { DEFAULT_PROJECT_ID } from '../../constants/projectDefaults';
import { nanoid } from 'nanoid';
import questionnaireService from '../../services/questionnaireService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Questionnaire = () => {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [editDialog, setEditDialog] = useState({ open: false, index: null });
  const [addDialog, setAddDialog] = useState(false);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const useCaseType = location.state?.useCaseType || 'human';
  const { user, isAdmin } = useAuth();
  
  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const [editData, setEditData] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    type: 'text',
    label: '',
    options: []
  });
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');
      
      // Validate that all required questions are answered
      const requiredQuestions = questions.filter(q => q.required !== false);
      const unansweredQuestions = requiredQuestions.filter(q => !responses[q.id]);
      
      if (unansweredQuestions.length > 0) {
        setError('Please answer all required questions before submitting.');
        return;
      }
      
      // Use default project ID for frontend submissions
      const questionnaireData = {
        questionnaireResponses: responses,
        projectId: DEFAULT_PROJECT_ID,
        useCaseType: useCaseType
      };
      
      // Send to backend for processing
      const result = await questionnaireService.processQuestionnaire(questionnaireData);
      
      setSuccess('Questionnaire submitted successfully! Risk analysis is being generated.');
      
      // Navigate to results page after a short delay
      setTimeout(() => {
        navigate(`/risk-matrix-results/${result.riskMatrixResult._id}`);
      }, 2000);
      
    } catch (error) {
      setError(error.message || 'Failed to submit questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setEditData({ ...questions[index] });
    setEditDialog({ open: true, index });
  };

  const handleEditSave = () => {
    const updated = [...questions];
    updated[editDialog.index] = { ...editData };
    setQuestions(updated);
    setEditDialog({ open: false, index: null });
  };

  const handleAdd = () => {
    setNewQuestion({ type: 'text', label: '', options: [] });
    setAddDialog(true);
  };

  const handleAddSave = () => {
    if (!newQuestion.label.trim()) return;
    setQuestions([
      ...questions,
      {
        ...newQuestion,
        id: nanoid(),
        options: newQuestion.options || [],
        value: newQuestion.type === 'checkbox' ? [] : ''
      }
    ]);
    setAddDialog(false);
  };

  return (
    <div>
      <div className="flex gap-3 items-center p-4">
        <Tooltip title="Go back">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: 'blue' }} />
          </IconButton>
        </Tooltip>
        <div className="font-bold text-lg flex-1">
          {isAdmin() ? 'Questionnaire Management' : 'Human-operated AI Use Case Questionnaire'}
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
        

        
        {questions.map((q, idx) => (
          <QuestionItem
            key={q.id}
            q={q}
            idx={idx}
            onEdit={handleEdit}
            value={responses[q.id]}
            onChange={(val) => handleResponseChange(q.id, val)}
            />
        ))}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={isSubmitting}
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
              {QUESTION_TYPES.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
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
