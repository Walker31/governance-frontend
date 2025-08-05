export const defaultQuestions = [
  {
    id: 1,
    type: 'text-country',
    label: "Who is submitting this request?",
    fields: [
      { type: 'text', label: 'Name, role & country of the request owner', value: '' }
    ]
  },
  {
    id: 2,
    type: 'radio',
    label: "Is this project internal or does it involve third parties?",
    options: [
      'Internal development',
      'Third-party Integration'
    ],
    value: ''
  },
  {
    id: 3,
    type: 'text',
    label: "What is the name of the product or system being developed or assessed?",
    value: ''
  },
  {
    id: 4,
    type: 'date-range',
    label: "What is the intended start and end date for this project?",
    start: '',
    end: ''
  },
  {
    id: 5,
    type: 'textarea',
    label: "Are there any known factors that might delay the timeline?",
    placeholder: "Describe any potential delays...",
    value: ''
  }
];

export const QUESTION_TYPES = [
  { value: 'text', label: 'Short Answer' },
  { value: 'textarea', label: 'Paragraph' },
  { value: 'radio', label: 'Multiple Choice' },
  { value: 'checkbox', label: 'Checkboxes' }
];

// Template type mapping based on selection
export const TEMPLATE_TYPE_MAPPING = {
  'Internal development': {
    'AI System': 'AI System',
    'Cybersecurity Management System': 'Cybersecurity Management System'
  },
  'Third-party Integration': {
    'Third-party AI System': 'Third-party AI System',
    'Third-party Cybersecurity System': 'Third-party Cybersecurity System'
  }
};