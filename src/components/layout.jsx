import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-screen bg-background">
      {/* Left Sidebar */}
      <div
        className={`
          transition-all duration-300
          bg-[#1d4ed8] text-white
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      </div>

      {/* Main Section: Navbar + Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar at top of content */}
        <div className="h-16 w-full shadow z-10">
          <Navbar />
        </div>

        {/* Main content under navbar */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f5f7fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
