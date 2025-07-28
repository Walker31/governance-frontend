import { FaHome, FaBars } from "react-icons/fa";
import SidebarItem from "./sidebar_item";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ open, onToggle }) => {
  const { isAdmin } = useAuth();

  return (
    <aside
      className={`
        h-full bg-[#1d4ed8] text-white flex flex-col py-6 px-2 shadow-md
        transition-all duration-300 overflow-y-auto
      `}
    >
      {/* Toggle Button */}
      <button
        className="mb-6 p-2 rounded hover:bg-[#3b6ef3] transition self-center"
        onClick={onToggle}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        <FaBars size={22} />
      </button>

      <nav className="flex flex-col space-y-2">
        <SidebarItem icon={<FaHome />} label="Dashboard" to="/" open={open} />

        {/* AI Section */}
        <SidebarItem
          icon={<AutoAwesomeMotionIcon />}
          label="AI"
          to="#"
          open={open}
          subItems={[
            { label: "AI Inventory (No agent)", to: "/ai-inventory" },
            { label: "AI Risk Assessment (Unicis)", to: "/ai-risk-assessment-unics" },
            { label: "AI Control Assessment", to: "/ai-control-assessment" },
            { label: "AI Regulatory Compliance (Trustible)", to: "/ai-regulatory-compliance-trustible" },
          ]}
        />

        <SidebarItem
          icon={<AssessmentIcon />}
          label="Cyber Management"
          to="#"
          open={open}
          subItems={[
            { label: "Risk Assessment", to: "/cyber-risk-assessment" },
            { label: "Control Assessment", to: "/cyber-control-assessment" },
            { label: "Risk Manager (Anectdotes)", to: "/cyber-risk-manager-anectdotes" },
          ]}
        />

        <SidebarItem
          icon={<FolderIcon />}
          label="Trust Center"
          to="#"
          open={open}
          subItems={[
            { label: "Documents", to: "/documents" },
            { label: "Insights", to: "/insights" },
          ]}
        />

        {/* Existing entries */}
        <SidebarItem
          icon={<AutoAwesomeMotionIcon />}
          label="Projects"
          to="/projects"
          open={open}
        />
        <SidebarItem icon={<FolderIcon />} label="Template Builder" to="/templates" open={open} />
        <SidebarItem icon={<ChatIcon />} label="Chat" to="/chat" open={open} />

        {/* Admin-only section */}
        {isAdmin() && (
          <>
            <div className={`border-t border-white/20 my-2 ${open ? 'mx-4' : 'mx-2'}`} />
            <SidebarItem icon={<PeopleIcon />} label="User Management" to="/users" open={open} />
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
