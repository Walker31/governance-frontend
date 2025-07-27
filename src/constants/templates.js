export const RESPONSE_TYPES = [
  { value: 'text', label: 'Text Answer' },
  { value: 'numeric', label: 'Numeric' },
  { value: 'mcq', label: 'Multiple Choice (Single Answer - MCQ)' },
  { value: 'msq', label: 'Multiple Select (MSQ)' },
  { value: 'boolean', label: 'Boolean (Yes/No)' }
];

export const sampleTemplates = [
  {
    id: 1,
    name: "AI Project Assessment",
    description: "Comprehensive assessment for new AI projects",
    questions: [
      {
        id: 1,
        question: "What is the primary objective of this AI project?",
        responseType: "text",
        required: true
      },
      {
        id: 2,
        question: "What is the estimated budget for this project?",
        responseType: "numeric",
        required: true
      },
      {
        id: 3,
        question: "Which departments will be involved?",
        responseType: "msq",
        options: ["IT", "Legal", "HR", "Finance", "Operations", "Marketing"],
        required: true
      },
      {
        id: 4,
        question: "Does this project involve external vendors?",
        responseType: "boolean",
        required: true
      },
      {
        id: 5,
        question: "What is the expected timeline for completion?",
        responseType: "mcq",
        options: ["1-3 months", "3-6 months", "6-12 months", "12+ months"],
        required: true
      }
    ]
  },
  {
    id: 2,
    name: "Data Privacy Compliance",
    description: "Template for data privacy and compliance assessments",
    questions: [
      {
        id: 1,
        question: "What types of personal data will be processed?",
        responseType: "msq",
        options: ["Names", "Email addresses", "Phone numbers", "Financial data", "Health data", "Location data"],
        required: true
      },
      {
        id: 2,
        question: "How many data subjects will be affected?",
        responseType: "numeric",
        required: true
      },
      {
        id: 3,
        question: "Is there a data protection officer assigned?",
        responseType: "boolean",
        required: true
      },
      {
        id: 4,
        question: "Describe the data retention policy",
        responseType: "text",
        required: false
      }
    ]
  },
  {
    id: 3,
    name: "Risk Assessment",
    description: "General risk assessment template",
    questions: [
      {
        id: 1,
        question: "What is the risk level of this project?",
        responseType: "mcq",
        options: ["Low", "Medium", "High", "Critical"],
        required: true
      },
      {
        id: 2,
        question: "What are the main risk factors?",
        responseType: "text",
        required: true
      },
      {
        id: 3,
        question: "Is there a mitigation plan in place?",
        responseType: "boolean",
        required: true
      }
    ]
  }
]; 