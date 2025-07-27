export const defaultQuestions = [
  {
    id: 1,
    type: 'text-country',
    label: "Please provide your name (or the name of the individual submitting this request) and their country of residence.",
    fields: [
      { type: 'text', label: 'Full name', value: '' },
      { type: 'select', label: 'Select country', value: '', options: ['India', 'United States', 'United Kingdom', 'Germany', 'France', 'China', 'Japan', 'Australia', 'Other'] }
    ]
  },
  {
    id: 2,
    type: 'radio',
    label: "Is this project solely in-house, or does it involve external collaboration?",
    options: [
      'a. In-house product development',
      'b. Adopting/integrating a third-party AI system'
    ],
    value: ''
  },
  {
    id: 3,
    type: 'checkbox',
    label: "Specify the regions requiring data support for this AI initiative.",
    options: [
      'North America',
      'Europe',
      'Asia Pacific',
      'Latin America',
      'Middle East & Africa',
      'Global'
    ],
    value: []
  },
  {
    id: 4,
    type: 'textarea',
    label: "What is the AI system's primary objective? Briefly describe how it addresses a specific organizational need.",
    placeholder: "Describe the primary objective and organizational need...",
    value: ''
  },
  {
    id: 5,
    type: 'radio',
    label: "Is your AI system a general-purpose model (e.g., generative AI)?",
    options: ['Yes', 'No'],
    value: ''
  },
  {
    id: 6,
    type: 'radio-text',
    label: "Detail the AI system's learning model.",
    options: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Reinforcement Learning',
      'Deep Learning',
      'Other'
    ],
    value: '',
    textValue: ''
  },
  {
    id: 7,
    type: 'radio-text',
    label: "Has a thorough review identified all relevant regulations and guidelines impacting development and deployment?",
    options: ['Yes', 'No', 'In Progress'],
    value: '',
    textValue: ''
  },
  {
    id: 8,
    type: 'radio-text',
    label: "Is there a process in place for human review of the system's outputs?",
    options: ['Yes', 'No', 'Planned but not implemented'],
    value: '',
    textValue: ''
  },
  {
    id: 9,
    type: 'checkbox-text',
    label: "Which groups or categories of individuals are subject to assessment, monitoring, or other impacts resulting from the use of the AI system?",
    options: [
      'Employees',
      'Customers',
      'Job Applicants',
      'General Public',
      'Vulnerable Groups',
      'Other'
    ],
    value: [],
    textValue: ''
  },
  {
    id: 10,
    type: 'date-range',
    label: "When would you like the project to begin and be completed?",
    start: '',
    end: ''
  },
  {
    id: 11,
    type: 'checkbox-text',
    label: "Are there any factors that could potentially delay or extend the project timeline?",
    options: [
      'Resource constraints',
      'Data availability or quality issues',
      'Regulatory approval processes',
      'Technical challenges',
      'Stakeholder alignment',
      'Other factors'
    ],
    value: [],
    textValue: ''
  }
];

export const QUESTION_TYPES = [
  { value: 'text', label: 'Short Answer' },
  { value: 'textarea', label: 'Paragraph' },
  { value: 'radio', label: 'Multiple Choice' },
  { value: 'checkbox', label: 'Checkboxes' }
];