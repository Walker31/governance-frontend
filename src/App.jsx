import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/layout";
import Home from "./pages/Dashboard/home";
import Templates from "./pages/Templates/main";
import TemplateQuestions from "./pages/Templates/TemplateQuestions";
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
import AIControlAssessment from "./pages/AI System/AI_Control_Assessment";
import Reports from "./pages/Reports/main";
import TrustCenterDocuments from "./pages/Trust Center/Documents";
import TrustCenterInsight from "./pages/Trust Center/Insights";
import Demo from "./pages/Demo/Demo";
import RiskAssessment from "./pages/CyberSecurity Management/Risk Assessment/RiskAssessment";
import RiskAnalysis from "./pages/CyberSecurity Management/RiskAnalysis";
import ThirdPartyAssessment from "./pages/ThirdPartyAssessment/main";
import RiskManager from "./pages/CyberSecurity Management/Risk Manager/RiskManager";
import Login from "./pages/Login/login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashAlt from "./pages/Dashboard/DahboardAlternate";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Root route: Login if no user, Dashboard if logged in */}
      <Route
        path="/"
        element={
          user ? (
            <Layout />
          ) : (
            <Login />
          )
        }
      >
        {user && (
          <>
            <Route index element={<DashAlt />} />
            <Route path="templates" element={<Templates />} />
            <Route path="templates/:templateId" element={<TemplateQuestions />} />
            <Route path="usecase" element={<UseCase />} />
            <Route path="questionare" element={<Questionare />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project-view/:projectId?" element={<ProjectView />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
            <Route path="chat" element={<ChatAgent />} />
            <Route path="demo" element={<Demo />} />
            <Route path="ai-inventory" element={<AIInventory />} />
            <Route path="ai-inventory/:assetId" element={<AssetDetail />} />
            <Route path="ai-risk-assessment" element={<AIRiskAssessment />} />
            <Route path="ai-control-assessment" element={<AIControlAssessment />} />
            <Route path="ai-policy" element={<AIPolicy />} />
            <Route path="ai-regulatory-assessment" element={<AIRegulatoryAssessment />} />
            <Route path="cyber-risk-assessment" element={<RiskAssessment />} />
            <Route path="cyber-control-assessment" element={<ControlAssessment />} />
            <Route path="cyber-risk-manager" element={<RiskManager />} />
            <Route path="cyber-risk-analysis" element={<RiskAnalysis />} />
            <Route path="3passessements" element={<ThirdPartyAssessment />} />
            <Route path="documents" element={<TrustCenterDocuments />} />
            <Route path="insights" element={<TrustCenterInsight />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Optional explicit login route */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
