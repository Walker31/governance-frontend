import { useState } from 'react';

const NewTemplateModal = ({ onClose, onCreate, responseTypes }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    responseType: 'text',
    required: true,
    options: []
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newOption, setNewOption] = useState('');

  const handleAddQuestion = () => {
    if (currentQuestion.question.trim()) {
      const questionWithId = {
        ...currentQuestion,
        id: templateData.questions.length + 1
      };
      
      setTemplateData({
        ...templateData,
        questions: [...templateData.questions, questionWithId]
      });
      
      setCurrentQuestion({
        question: '',
        responseType: 'text',
        required: true,
        options: []
      });
      setShowQuestionForm(false);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() && !currentQuestion.options.includes(newOption.trim())) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, newOption.trim()]
      });
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.filter((_, i) => i !== index)
    });
  };

  const handleRemoveQuestion = (index) => {
    setTemplateData({
      ...templateData,
      questions: templateData.questions.filter((_, i) => i !== index)
    });
  };

  const handleCreateTemplate = () => {
    if (templateData.name.trim() && templateData.questions.length > 0) {
      onCreate(templateData);
    }
  };

  const canCreate = templateData.name.trim() && templateData.questions.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Create New Template</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Template Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter template name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={templateData.description}
                onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter template description"
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
              <button
                onClick={() => setShowQuestionForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Add Question
              </button>
            </div>

            {/* Questions List */}
            {templateData.questions.length > 0 && (
              <div className="space-y-3">
                {templateData.questions.map((question, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {responseTypes.find(type => type.value === question.responseType)?.label}
                          </span>
                          {question.required && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        {question.options && question.options.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">Options:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {question.options.map((option, optIndex) => (
                                <span
                                  key={optIndex}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(index)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Question Form */}
            {showQuestionForm && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-4">Add New Question</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text *
                    </label>
                    <textarea
                      value={currentQuestion.question}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Enter your question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Type *
                    </label>
                    <select
                      value={currentQuestion.responseType}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, responseType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {responseTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Options for MCQ and MSQ */}
                  {(currentQuestion.responseType === 'mcq' || currentQuestion.responseType === 'msq') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options *
                      </label>
                      <div className="space-y-2">
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{index + 1}.</span>
                            <span className="flex-1 text-sm bg-white px-3 py-2 border border-gray-300 rounded">
                              {option}
                            </span>
                            <button
                              onClick={() => handleRemoveOption(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{currentQuestion.options.length + 1}.</span>
                          <input
                            type="text"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add new option"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                          />
                          <button
                            onClick={handleAddOption}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="required"
                      checked={currentQuestion.required}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, required: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="required" className="ml-2 text-sm text-gray-700">
                      This question is required
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddQuestion}
                      disabled={!currentQuestion.question.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Add Question
                    </button>
                    <button
                      onClick={() => setShowQuestionForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTemplate}
              disabled={!canCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Create Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTemplateModal; 