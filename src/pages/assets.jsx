import React from "react";

const frameworks = [
  {
    title: "EU AI Act",
    description:
      "The EU AI Act is a comprehensive regulatory framework that categorizes AI systems based on risk levels and imposes requirements accordingly.",
    details: [
      "Risk-based approach with four categories: unacceptable, high, limited, and minimal risk.",
      "Prohibits certain AI applications deemed too risky.",
      "Requires conformity assessments for high-risk AI systems.",
      "Mandates transparency for certain AI interactions with humans.",
    ],
  },
  {
    title: "NIST AI Risk Management Framework",
    description:
      "NIST 42001 provides guidelines for managing risks associated with AI systems throughout their lifecycle.",
    details: [
      "Voluntary framework focused on managing AI risks.",
      "Covers governance, mapping, measuring, and managing AI risks.",
      "Provides practical guidance for organizations of all sizes.",
      "Emphasizes continuous monitoring and improvement.",
    ],
  },
  {
    title: "GDPR",
    description:
      "General Data Protection Regulation impacts AI systems that process personal data of EU citizens.",
    details: [
      "Requires lawful basis for processing personal data.",
      "Grants individuals rights regarding their data used in AI systems.",
      "Mandates data protection impact assessments for high-risk processing.",
      "Limits automated decision-making without human oversight.",
    ],
  },
];

const Assets = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">AI Assets & Frameworks</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section: Summary Cards */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Regulatory Frameworks</h3>
          {frameworks.map((fw, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-300 rounded-2xl p-4 shadow hover:shadow-md transition duration-300 bg-white"
            >
              <div className="font-semibold text-blue-900">{fw.title}</div>
              <p className="text-gray-600 mt-1 mb-3">{fw.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-max text-sm transition">
                View Requirements
              </button>
            </div>
          ))}
        </div>

        {/* Right Section: Detailed Explanations */}
        <div className="w-full md:w-1/2 rounded-lg p-6 shadow space-y-6 bg-white">
          <h3 className="text-lg font-semibold">Framework Explanations</h3>
          <p className="text-sm text-gray-700">
            Regulatory frameworks provide structured approaches to managing AI risks and ensuring compliance. Here's how they compare:
          </p>

          {frameworks.map((fw, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-blue-800">{fw.title}</h4>
              <ul className="list-disc list-inside ml-2 text-sm text-gray-700 mt-1 space-y-1">
                {fw.details.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assets;
