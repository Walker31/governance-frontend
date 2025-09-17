import SidebarItem from "./sidebar_item";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import {
  ChevronDown,
  Shield,
  Play,
  Home,
  BarChart3,
  FolderOpen,
  AlertTriangle,
  ClipboardList,
  FileText,
  Users,
  Clock,
  Files,
  Heart,
  HelpCircle,
  Settings,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ open }) => {
  const { isAdmin } = useAuth();

  return (
    <aside
      className={`
        h-full bg-slate-800 min-h-screen text-white flex flex-col py-6 px-2 shadow-md
        transition-all duration-300 overflow-y-auto
      `}
    >
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" alt="RAKfort Logo" className="w-8 h-8" />
        <div>
          <h1 className="text-lg font-bold">RAKFORT</h1>
          <p className="text-xs text-white/70">AI Governance & Security</p>
        </div>
      </div>

      <nav className="flex flex-col space-y-2">
        <SidebarItem icon={<Play />} label="Demo" to="/demo" open={open} />
        <SidebarItem icon={<Home />} label="Dashboard" to="/" open={open} />

        {/* AI Section */}
        <SidebarItem
          icon={<BarChart3 />}
          label="AI System"
          to="#"
          open={open}
          subItems={[
            {
              label: "AI Risk Assessment",
              to: "/ai-risk-assessment",
            },
            { label: "AI Control Assessment", to: "/ai-control-assessment" },
            { label: "AI Policy", to: "/ai-policy" },
            {
              label: "AI Regulatory Assessment",
              to: "/ai-regulatory-assessment",
            },
          ]}
        />

        <SidebarItem
          icon={<Clock />}
          label="Cybersecurity Management"
          to="#"
          open={open}
          subItems={[
            { label: "Risk Assessment", to: "/cyber-risk-assessment" },
            { label: "Control Assessment", to: "/cyber-control-assessment" },
            {
              label: "Risk Manager",
              to: "/cyber-risk-manager",
            },
            { label: 'Risk Analysis', to: '/cyber-risk-analysis'}
          ]}
        />
        {/* Existing entries */}

        {/* Existing entries */}

        <SidebarItem
          icon={<Users />}
          label="Third-Party Assessment"
          to="/3passessements"
          open={open}
        />

        {/*<SidebarItem icon={<ChatIcon />} label="Chat" to="/chat" open={open} />*/}

        {/* Admin-only section */}
        {isAdmin() && (
          <>
            <div
              className={`border-t border-white/20 my-2 ${
                open ? "mx-4" : "mx-2"
              }`}
            />
            <SidebarItem
              icon={<ClipboardList />}
              label="Template Builder"
              to="/templates"
              open={open}
            />
            <SidebarItem
              icon={<PeopleIcon />}
              label="User Management"
              to="/users"
              open={open}
            />
            <SidebarItem
              icon={<Heart />}
              label="Trust Center"
              to="#"
              open={open}
              subItems={[
                { label: "Documents", to: "/documents" },
                { label: "Insights", to: "/insights" },
              ]}
        />
          </>
        )}
        <div className="border-t border-white/20 my-2"></div>

        
        <SidebarItem
          icon={<HelpCircle />}
          label="Support"
          to="/support"
          open={open}
        />

        <SidebarItem
          icon={<Settings />}
          label="Settings"
          to="/settings"
          open={open}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
