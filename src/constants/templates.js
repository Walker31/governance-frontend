export const RESPONSE_TYPES = [
  { value: 'text', label: 'Text Answer' },
  { value: 'numeric', label: 'Numeric' },
  { value: 'mcq', label: 'Multiple Choice (Single Answer - MCQ)' },
  { value: 'msq', label: 'Multiple Select (MSQ)' },
  { value: 'boolean', label: 'Boolean (Yes/No)' }
];

export const TEMPLATE_TYPES = [
  { value: 'AI System', label: 'AI System' },
  { value: 'Cybersecurity Management System', label: 'Cybersecurity Management System' },
  { value: 'Third-party AI System', label: 'Third-party AI System' },
  { value: 'Third-party Cybersecurity System', label: 'Third-party Cybersecurity System' }
];

export const sampleTemplates = [
  {
    id: 1,
    name: "AI System Assessment",
    description: "Comprehensive assessment for AI systems including regulatory compliance and risk management",
    templateType: "AI System",
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of the AI system?",
        responseType: "text",
        required: true
      },
      {
        id: 2,
        question: "Is the AI system considered general-purpose (e.g., GenAI, LLMs)?",
        responseType: "boolean",
        required: true
      },
      {
        id: 3,
        question: "What type of learning model is used?",
        responseType: "mcq",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning", "Deep Learning", "Other"],
        required: true
      },
      {
        id: 4,
        question: "From which regions or jurisdictions will data be sourced or processed?",
        responseType: "text",
        required: true
      },
      {
        id: 5,
        question: "Will the system make autonomous decisions or provide recommendations?",
        responseType: "mcq",
        options: ["Autonomous decisions", "Provide recommendations only", "Both autonomous decisions and recommendations", "Neither"],
        required: true
      },
      {
        id: 6,
        question: "Has a regulatory impact assessment been conducted?",
        responseType: "text",
        required: true
      },
      {
        id: 7,
        question: "Is there human oversight of the system's outputs?",
        responseType: "boolean",
        required: true
      },
      {
        id: 8,
        question: "What risk mitigation controls are in place (e.g., bias detection, anomaly alerts)?",
        responseType: "text",
        required: true
      },
      {
        id: 9,
        question: "Are there fallback or escalation procedures in case of system failure or unexpected behaviour?",
        responseType: "text",
        required: true
      },
      {
        id: 10,
        question: "Which groups or individuals are affected by this system?",
        responseType: "msq",
        options: ["Employees", "Customers", "Vendors", "Vulnerable populations", "General public", "Other"],
        required: true
      },
      {
        id: 11,
        question: "Has a stakeholder impact assessment been conducted?",
        responseType: "boolean",
        required: true
      },
      {
        id: 12,
        question: "Are there transparency mechanisms for affected individuals (e.g., opt-out, explanation of decisions)?",
        responseType: "text",
        required: true
      },
      {
        id: 13,
        question: "Will the system process personal, sensitive, or biometric data?",
        responseType: "boolean",
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