import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaptopIcon from '@mui/icons-material/Laptop';
import PersonIcon from '@mui/icons-material/Person';
import Radio from '@mui/material/Radio';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackendUrl } from '@/config/env';
import templateService from '../../services/templateService';
import QuestionItem from '../quetionare/questionItem';
import questionnaireService from '../../services/questionnaireService';

const UseCase = () => {
  const [selected, setSelected] = useState('bot');
  const [useCaseData, setUseCaseData] = useState({
    requestOwner: '',
    projectType: '',
    systemName: '',
    startDate: '',
    endDate: '',
    delayFactors: ''
  });
  const [subQuestions, setSubQuestions] = useState([]);
  const [showSubQuestions, setShowSubQuestions] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateQuestions, setTemplateQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const navigate = useNavigate();

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setTemplatesLoading(true);
      console.log('=== TEMPLATE LOADING DEBUG ===');
      console.log('Loading templates...');
      
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      console.log('Authentication token found:', !!token);
      if (!token) {
        console.error('No authentication token found');
        setError('Please log in to access templates. Using fallback questions.');
        return;
      }
      
      // First check if backend is running
      try {
        console.log('Checking backend health...');
        const healthResponse = await fetch(getBackendUrl('/'));
        const healthData = await healthResponse.json();
        console.log('Backend health check:', healthData);
        
        // Test template count
        console.log('Testing template count endpoint...');
        const countResponse = await fetch(getBackendUrl('/templates/test/count'), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const countData = await countResponse.json();
        console.log('Template count check:', countData);
        
        if (countData.count === 0) {
          console.warn('No templates found in database. Templates may not be seeded.');
          setError('No templates found in database. Templates may not be seeded.');
          return;
        }
      } catch (healthError) {
        console.error('Backend health check failed:', healthError);
        setError('Backend server is not running. Please start the backend server.');
        return;
      }
      
      console.log('Calling templateService.getTemplates()...');
      const data = await templateService.getTemplates();
      console.log('Raw templates data received:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      
      // Validate template data structure
      if (Array.isArray(data)) {
        console.log('Data is array, validating templates...');
        const validTemplates = data.filter(template => {
          const isValid = template && 
            template.templateType && 
            Array.isArray(template.questions);
          
          if (!isValid) {
            console.warn('Invalid template structure:', template);
          }
          
          return isValid;
        });
        
        console.log('Valid templates count:', validTemplates.length);
        console.log('Total templates count:', data.length);
        
        if (validTemplates.length !== data.length) {
          console.warn('Some templates have invalid structure:', data);
        }
        
        // Log each valid template for debugging
        validTemplates.forEach((template, index) => {
          console.log(`Valid template ${index + 1}:`, {
            id: template.id,
            name: template.name,
            templateType: template.templateType,
            questionsCount: template.questions ? template.questions.length : 0,
            questions: template.questions ? template.questions.slice(0, 2) : [] // Log first 2 questions
          });
        });
        
        setTemplates(validTemplates);
        console.log('Templates set successfully');
      } else {
        console.error('Invalid template data format:', data);
        setError('Invalid template data received from server.');
      }
    } catch (error) {
      console.error('=== TEMPLATE LOADING ERROR ===');
      console.error('Error loading templates:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setError('Authentication required. Please log in to access templates.');
      } else {
        setError('Failed to load templates. Using fallback questions.');
      }
      
      // Test the API directly
      try {
        console.log('Testing API directly...');
        const response = await fetch(getBackendUrl('/templates'), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Direct API response status:', response.status);
        const testData = await response.json();
        console.log('Direct API test result:', testData);
      } catch (testError) {
        console.error('Direct API test failed:', testError);
      }
    } finally {
      setTemplatesLoading(false);
      console.log('=== END TEMPLATE LOADING DEBUG ===');
    }
  };

  const handleProjectTypeChange = (type) => {
    console.log('Project type changed to:', type);
    setUseCaseData(prev => ({ ...prev, projectType: type }));
    
    // Set sub-questions based on project type
    if (type === 'Internal development') {
      setSubQuestions([
        { id: 'ai-system', label: 'AI System', value: '' },
        { id: 'cybersecurity', label: 'Cybersecurity Management System', value: '' }
      ]);
    } else if (type === 'Third-party Integration') {
      setSubQuestions([
        { id: 'third-party-ai', label: 'Third-party AI System', value: '' },
        { id: 'third-party-cybersecurity', label: 'Third-party Cybersecurity System', value: '' }
      ]);
    }
    setShowSubQuestions(true);
    // Reset template questions when project type changes
    setSelectedTemplate(null);
    setTemplateQuestions([]);
  };

  const handleSubQuestionChange = async (id, value) => {
    console.log('=== QUESTION LOADING DEBUG ===');
    console.log('Sub question changed:', id, value);
    console.log('Current templates state:', templates);
    console.log('Templates loading state:', templatesLoading);
    
    setSubQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, value } : q)
    );

    if (value === 'selected') {
      // Map sub-question to template type
      const templateTypeMapping = {
        'ai-system': 'AI System',
        'cybersecurity': 'Cybersecurity Management System',
        'third-party-ai': 'Third-party AI System',
        'third-party-cybersecurity': 'Third-party Cybersecurity System'
      };

      const templateType = templateTypeMapping[id];
      console.log('Looking for template type:', templateType);
      console.log('Template type mapping:', templateTypeMapping);
      console.log('Available templates count:', templates.length);
      console.log('Available templates:', templates);
      
      // Log each template's type for debugging
      templates.forEach((template, index) => {
        console.log(`Template ${index + 1}:`, {
          id: template.id,
          name: template.name,
          templateType: template.templateType,
          questionsCount: template.questions ? template.questions.length : 0
        });
      });
      
      const matchingTemplate = templates.find(t => t.templateType === templateType);
      console.log('Matching template found:', !!matchingTemplate);
      console.log('Matching template details:', matchingTemplate);

      if (matchingTemplate && matchingTemplate.questions) {
        console.log('Template questions found:', matchingTemplate.questions.length);
        console.log('Template questions structure:', matchingTemplate.questions);
        
        setSelectedTemplate(matchingTemplate);
        
        // Convert template questions to questionnaire format with better error handling
        const convertedQuestions = matchingTemplate.questions.map((q, index) => {
          console.log(`Converting question ${index + 1}:`, q);
          
          // Handle different question field names
          const questionText = q.question || q.questionText || `Question ${index + 1}`;
          console.log(`Question ${index + 1} text:`, questionText);
          
          // Map response types to frontend types
          let frontendType = 'text';
          let options = [];
          
          switch (q.responseType) {
            case 'text':
              frontendType = 'textarea';
              break;
            case 'numeric':
              frontendType = 'text';
              break;
            case 'mcq':
              frontendType = 'radio';
              options = q.options || [];
              break;
            case 'msq':
              frontendType = 'checkbox';
              options = q.options || [];
              break;
            case 'boolean':
              frontendType = 'radio';
              options = ['Yes', 'No'];
              break;
            default:
              frontendType = 'text';
          }
          
          const convertedQuestion = {
            id: q.id || q._id || index + 1,
            type: frontendType,
            label: questionText,
            options: options,
            value: frontendType === 'checkbox' ? [] : '',
            required: q.required !== false && q.isRequired !== false,
            placeholder: frontendType === 'textarea' ? 'Enter your answer...' : ''
          };
          
          console.log(`Converted question ${index + 1}:`, convertedQuestion);
          return convertedQuestion;
        });
        
        console.log('Final converted questions:', convertedQuestions);
        setTemplateQuestions(convertedQuestions);
        setResponses({}); // Reset responses for new template
        console.log('Template questions set successfully');
      } else {
        console.error('=== TEMPLATE LOADING ERROR ===');
        console.error('No matching template found for type:', templateType);
        console.error('Available template types:', templates.map(t => t.templateType));
        console.error('Template count:', templates.length);
        
        if (matchingTemplate && !matchingTemplate.questions) {
          console.error('Template found but has no questions:', matchingTemplate);
        }
        
        // Fallback: Create a basic template with default questions
        const fallbackTemplate = {
          id: 'fallback',
          name: `${templateType} Assessment`,
          templateType: templateType,
          questions: [
            {
              id: 1,
              question: `What is the primary purpose of this ${templateType.toLowerCase()}?`,
              responseType: 'text',
              required: true
            },
            {
              id: 2,
              question: `What are the main risks associated with this ${templateType.toLowerCase()}?`,
              responseType: 'textarea',
              required: true
            },
            {
              id: 3,
              question: `What mitigation strategies are in place?`,
              responseType: 'textarea',
              required: true
            }
          ]
        };
        
        console.log('Using fallback template:', fallbackTemplate);
        setSelectedTemplate(fallbackTemplate);
        
        const fallbackQuestions = fallbackTemplate.questions.map((q, index) => ({
          id: q.id || index + 1,
          type: q.responseType === 'text' ? 'textarea' : 'text',
          label: q.question,
          options: [],
          value: '',
          required: q.required !== false,
          placeholder: 'Enter your answer...'
        }));
        
        console.log('Using fallback questions:', fallbackQuestions);
        setTemplateQuestions(fallbackQuestions);
        setResponses({});
        console.log('Fallback questions set successfully');
      }
    }
    console.log('=== END QUESTION LOADING DEBUG ===');
  };

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');
      
      // Validate that all required questions are answered
      const requiredQuestions = templateQuestions.filter(q => q.required !== false);
      const unansweredQuestions = requiredQuestions.filter(q => !responses[q.id]);
      
      if (unansweredQuestions.length > 0) {
        setError('Please answer all required questions before submitting.');
        return;
      }
      
      // Combine use case data with questionnaire responses
      const questionnaireData = {
        questionnaireResponses: responses,
        useCaseData: useCaseData,
        selectedTemplate: selectedTemplate,
        projectId: 'default_project_id',
        useCaseType: 'human'
      };
      
      // Send to backend for processing
      const result = await questionnaireService.processQuestionnaire(questionnaireData);
      
      setSuccess(`Questionnaire submitted successfully! Risk analysis ${result.riskAssessmentId || 'R-001'} is being generated.`);
      
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

  const UseCaseCard = ({ type, icon, title, description, bgColor }) => (
    <div
      onClick={() => setSelected(type)}
      className={`flex flex-col border rounded-xl p-4 gap-4 cursor-pointer w-1/2 
        ${selected === type ? 'border-blue-600 shadow-md' : 'border-gray-300'}`}
    >
      <div className='flex gap-2 items-center'>
        <div className={`rounded-full p-2 ${bgColor}`}>
          {icon}
        </div>
        <div className='font-semibold text-xl'>{title}</div>
      </div>
      <p className='text-gray-600'>{description}</p>
      <div className='flex justify-end'>
        <Radio
          checked={selected === type}
          onChange={() => setSelected(type)}
          value={type}
          color="primary"
        />
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-6 px-4 py-6'>
      <div className='flex items-center gap-2'>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <div className='font-semibold text-2xl'>Create a new use case</div>
      </div>

      <div className='p-6 shadow-xl transform hover:-translate-y-1 rounded-xl flex flex-col gap-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-2'>Select Use Case Type</h2>
          <p className='text-gray-600'>Choose the type of use case you want to create</p>
        </div>

        <div className='flex gap-4'>
          <UseCaseCard
            type="bot"
            icon={<LaptopIcon />}
            title="AI Agent"
            description="Automated AI agent for risk assessment"
            bgColor="bg-blue-100"
          />
          <UseCaseCard
            type="human"
            icon={<PersonIcon />}
            title="Human-operated"
            description="Manual questionnaire-based assessment"
            bgColor="bg-green-100"
          />
        </div>

        {selected === 'human' && (
          <div className='mt-6 space-y-4'>
            <h3 className='text-xl font-semibold'>Use Case Details</h3>
            
            {/* Question 1: Request Owner */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                1. Who is submitting this request?
              </label>
              <input
                type="text"
                placeholder="Name, role & country of the request owner"
                value={useCaseData.requestOwner}
                onChange={(e) => setUseCaseData(prev => ({ ...prev, requestOwner: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Question 2: Project Type */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                2. Is this project internal or does it involve third parties?
              </label>
              <div className='space-y-2'>
                <label className='flex items-center'>
                  <input
                    type="radio"
                    name="projectType"
                    value="Internal development"
                    checked={useCaseData.projectType === 'Internal development'}
                    onChange={(e) => handleProjectTypeChange(e.target.value)}
                    className="mr-2"
                  />
                  Internal development
                </label>
                <label className='flex items-center'>
                  <input
                    type="radio"
                    name="projectType"
                    value="Third-party Integration"
                    checked={useCaseData.projectType === 'Third-party Integration'}
                    onChange={(e) => handleProjectTypeChange(e.target.value)}
                    className="mr-2"
                  />
                  Third-party Integration
                </label>
              </div>
            </div>

            {/* Sub-questions based on project type */}
            {showSubQuestions && (
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Select system type:
                </label>
                {templatesLoading && (
                  <div className="text-sm text-blue-600 mb-2">
                    Loading templates...
                  </div>
                )}
                <div className='space-y-2'>
                  {subQuestions.map((question) => (
                    <label key={question.id} className='flex items-center'>
                      <input
                        type="radio"
                        name="systemType"
                        value="selected"
                        checked={question.value === 'selected'}
                        onChange={() => handleSubQuestionChange(question.id, 'selected')}
                        className="mr-2"
                      />
                      {question.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Error message for template loading */}
            {error && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                {error}
                {error.includes('log in') && (
                  <div className="mt-2">
                    <button
                      onClick={() => navigate('/login')}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Click here to log in
                    </button>
                  </div>
                )}
                {error.includes('No templates found') && (
                  <div className="mt-2">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(getBackendUrl('/templates/seed'), {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                          });
                          const result = await response.json();
                          console.log('Seed result:', result);
                          setError('');
                          loadTemplates(); // Reload templates
                        } catch (seedError) {
                          console.error('Failed to seed templates:', seedError);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Click here to seed templates
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Question 3: System Name */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                3. What is the name of the product or system being developed or assessed?
              </label>
              <input
                type="text"
                placeholder="Enter system name"
                value={useCaseData.systemName}
                onChange={(e) => setUseCaseData(prev => ({ ...prev, systemName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Question 4: Date Range */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                4. What is the intended start and end date for this project?
              </label>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-600 mb-1'>Start Date</label>
                  <input
                    type="date"
                    value={useCaseData.startDate}
                    onChange={(e) => setUseCaseData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-600 mb-1'>End Date</label>
                  <input
                    type="date"
                    value={useCaseData.endDate}
                    onChange={(e) => setUseCaseData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Question 5: Delay Factors */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                5. Are there any known factors that might delay the timeline?
              </label>
              <textarea
                placeholder="Describe any potential delays..."
                value={useCaseData.delayFactors}
                onChange={(e) => setUseCaseData(prev => ({ ...prev, delayFactors: e.target.value }))}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Template Questions Section */}
            {selectedTemplate && templateQuestions.length > 0 && (
              <div className='mt-8 border-t pt-6'>
                <div className='mb-4'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {selectedTemplate.name} Assessment
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    Please answer the following questions for your {selectedTemplate.templateType} assessment
                  </p>
                </div>

                {/* Use Case Summary */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Use Case Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Request Owner:</span> {useCaseData.requestOwner}
                    </div>
                    <div>
                      <span className="font-medium">Project Type:</span> {useCaseData.projectType}
                    </div>
                    <div>
                      <span className="font-medium">System Name:</span> {useCaseData.systemName}
                    </div>
                    <div>
                      <span className="font-medium">Timeline:</span> {useCaseData.startDate} to {useCaseData.endDate}
                    </div>
                  </div>
                </div>

                {/* Template Questions */}
                <div className='space-y-6'>
                  {templateQuestions.map((q, idx) => (
                    <QuestionItem
                      key={q.id}
                      q={q}
                      idx={idx}
                      value={responses[q.id]}
                      onChange={(val) => handleResponseChange(q.id, val)}
                    />
                  ))}
                </div>

                {/* Submit Button */}
                <div className='flex justify-end mt-6'>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Assessment'}
                  </button>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selected === 'bot' && (
          <div className='text-center mt-6'>
            <p className='text-gray-600 mb-4'>AI Agent functionality coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UseCase;
