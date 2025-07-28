// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const NAVBAR_HEIGHT = 64; // px

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <Navbar />
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex h-full" style={{ overflow: 'visible' }}>
        {/* Fixed Sidebar */}
        <div
          className={`
            fixed left-0 z-40
            transition-all duration-300
            bg-[#1d4ed8]
            h-[calc(100vh-64px)]
            mt-[64px]
            ${sidebarOpen ? "w-64" : "w-16"}
          `}
        >
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
        </div>

        {/* Main Content */}
        <main
          className={`
            transition-all duration-300
            bg-[#f5f7fa]
            h-[calc(100vh-64px)]
            mt-[64px]
            flex-1
            overflow-y-auto
            p-6
            shadow-none
            ${sidebarOpen ? "ml-64" : "ml-16"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
