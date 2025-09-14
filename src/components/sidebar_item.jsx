import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, label, to, open, subItems }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const itemRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isSubItemActive =
    subItems && subItems.some((item) => location.pathname.startsWith(item.to));

  const toggleDropdown = () => {
    if (!subItems) return;
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const mainTo = to;

  return (
    <div ref={itemRef} className=" select-none">
      {/* Main Item */}
      <div
        role="button"
        tabIndex={0}
        className={`flex w-full text-sm text-white/80 hover:bg-white/10 items-center space-x-3 px-4 py-2 rounded-md transition duration-200 cursor-pointer hover:bg-accent hover:text-accent-foreground${
          (location.pathname === mainTo || isSubItemActive)
            ? "bg-white text-[#1d4ed8] font-semibold"
            : "hover:bg-[#3b6ef3] hover:text-white text-white"
        }`}
        onClick={() => {
          if (subItems) {
            toggleDropdown();
          } else {
            navigate(to);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            subItems ? toggleDropdown() : navigate(to);
          }
        }}
      >
        <span className="text-lg">{icon}</span>
        {open && <span className="text-sm">{label}</span>}
        {subItems && open && (
          <span
            className={`ml-auto transform transition-transform ${
              isDropdownOpen ? "rotate-90" : ""
            }`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </span>
        )}
      </div>

      {/* Sub Items Dropdown (Custom in DOM, not portal) */}
      {subItems && (
        <div
          className={`z-50 absolute right-[73%] -translate-y-[50%]  mt-1 w-[200px] bg-slate-800 rounded-lg shadow-xl border border-blue-100 overflow-hidden transition-all duration-200 origin-top ${
            isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
          style={{ transformOrigin: "top" }}
        >
          {subItems.map((item, idx) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <div
                key={idx}
                onClick={() => {
                  navigate(item.to);
                  setDropdownOpen(false);
                }}
                className={`px-5 py-2 text-sm font-medium cursor-pointer transition-colors ${
                  isActive
                    ? "bg-slate-500 text-white/80"
                    : "hover:bg-slate-700 text-white hover:text-white/90"
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
