"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, NotebookPen, X } from "lucide-react";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} className="mr-2" />,
    },
    {
      href: "/dashboard/audit-logs",
      label: "Audit Log",
      icon: <NotebookPen size={18} className="mr-2" />,
    },
  ];

  const handleLogout = () => {
    document.cookie = "admin=; Max-Age=0; path=/;";
    location.href = "/login";
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block overflow-y-auto`}
    >
      <div className="flex flex-col h-full justify-between p-6 relative">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-black"
        >
          <X size={24} />
        </button>

        <div>
          <div className="flex flex-col items-center mb-10 mt-4">
            <Image
              src="/images/demo/logo.jpeg"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
            <h2 className="text-xl mt-3 font-bold text-center text-black">
              OneClick<span className="text-orange-400">Drive</span>
            </h2>
          </div>

          <nav className="flex flex-col space-y-3">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 text-black ${
                  pathname === href
                    ? "bg-orange-500 text-white font-semibold shadow"
                    : "hover:bg-gray-300 hover:text-white"
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
