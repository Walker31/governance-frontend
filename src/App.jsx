import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout";
import Home from "./pages/Dashboard/home";
import Templates from "./pages/Templates/main";
import UseCase from "./pages/useCase/main";
import Questionare from "./pages/quetionare/main";
import Projects from "./pages/Projects/main";
import NotFound from "./components/notFound";
import ProjectView from "./pages/Projects/projectView";
import UserManagement from "./pages/UserManagement/main";
import ChatAgent from "./pages/ChatAgent/main";
import ControlAssessment from "./pages/CyberSecurity Management/Control Assessment";
import AIRiskAssessment from "./pages/AI System/AI_Risk_Assessment";
import AIPolicy from "./pages/AI System/AIPolicy";
import AIRegulatoryAssessment from "./pages/AI System/AIRegulatoryAssessment";
import AIInventory from "./pages/AI System/AIInventory";
import AssetDetail from "./pages/AI System/AssetDetail";
import Reports from "./pages/Reports/main";
import TrustCenterDocuments from "./pages/Trust Center/Documents";
import TrustCenterInsight from "./pages/Trust Center/Insights";
import Demo from "./pages/Demo/Demo";
import RiskAssessment from "./pages/CyberSecurity Management/Risk Assessment/RiskAssessment";
import RiskAnalysis from "./pages/CyberSecurity Management/RiskAnalysis";
import ThirdPartyAssessment from "./pages/ThirdPartyAssessment/main";
import RiskManager from "./pages/CyberSecurity Management/Risk Manager/RiskManager";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="templates" element={<Templates />} />
            <Route path="usecase" element={<UseCase/>} />
            <Route path="questionare" element={<Questionare/>}/>
            <Route path="projects" element={<Projects/>}/>
            <Route path="project-view" element={<ProjectView/>}/>
            <Route path="reports" element={<Reports/>}/>
            <Route path="users" element={<UserManagement />} />
            <Route path="chat" element={<ChatAgent />} />
            <Route path="demo" element={<Demo />} />
            <Route path="ai-inventory" element={<AIInventory />} />
            <Route path="ai-inventory/:assetId" element={<AssetDetail />} />
            <Route path="ai-risk-assessment" element={<AIRiskAssessment/>} />
            <Route path="ai-control-assessment" element={<PlaceholderPage title="AI Control Assessment" />} />
            <Route path="ai-policy" element={<AIPolicy/>} />
            <Route path="ai-regulatory-assessment" element={<AIRegulatoryAssessment/>} />

            <Route path="cyber-risk-assessment" element={<RiskAssessment />} />
            <Route path="cyber-control-assessment" element={<ControlAssessment/>} />
            <Route path="cyber-risk-manager" element={<RiskManager/>} />
            <Route path="cyber-risk-analysis" element={<RiskAnalysis/>} />

            <Route path="3passessements" element={<ThirdPartyAssessment/>} />

            <Route path="documents" element={<TrustCenterDocuments/>} />
            <Route path="insights" element={<TrustCenterInsight/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">This page is under development.</p>
    </div>
  );
};



export default App;
