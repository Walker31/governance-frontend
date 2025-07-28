import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout";
import Home from "./pages/Home/home";
import Templates from "./pages/Templates/main";
import UseCase from "./pages/useCase/main";
import Questionare from "./pages/quetionare/main";
import Projects from "./pages/Projects/main";
import ProjectView from "./pages/Projects/projectView";
import UserManagement from "./pages/UserManagement/main";
import ChatAgent from "./pages/ChatAgent/main";

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
            <Route path="users" element={<UserManagement />} />
            <Route path="chat" element={<ChatAgent />} />
            <Route path="ai-inventory" element={<PlaceholderPage title="AI Inventory" />} />
            <Route path="ai-risk-assessment-unics" element={<PlaceholderPage title="AI Risk Assessment (Unicis)" />} />
            <Route path="ai-control-assessment" element={<PlaceholderPage title="AI Control Assessment" />} />
            <Route path="ai-regulatory-compliance-trustible" element={<PlaceholderPage title="AI Regulatory Compliance (Trustible)" />} />

            <Route path="cyber-risk-assessment" element={<PlaceholderPage title="Cyber Risk Assessment" />} />
            <Route path="cyber-control-assessment" element={<PlaceholderPage title="Cyber Control Assessment" />} />
            <Route path="cyber-risk-manager-anectdotes" element={<PlaceholderPage title="Cyber Risk Manager (Anectdotes)" />} />

            <Route path="documents" element={<PlaceholderPage title="Trust Center: Documents" />} />
            <Route path="insights" element={<PlaceholderPage title="Trust Center: Insights" />} />

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
