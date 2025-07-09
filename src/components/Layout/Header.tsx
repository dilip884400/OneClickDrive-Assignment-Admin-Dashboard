"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const adminCookie = cookies.find((c) => c.startsWith("admin="));
    if (adminCookie) {
      const email = adminCookie.split("=")[1];
      setAdminEmail(decodeURIComponent(email));
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-30 bg-white shadow flex items-center justify-between px-6 ml-0 md:ml-64">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden text-gray-700 hover:text-black"
          >
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          Welcome to <span className="text-orange-500">Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-gray-800">
            {adminEmail || "Admin"}
          </span>
        </div>
        <Image
          src="/images/demo/logo.jpeg"
          alt="Admin Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover border-2 border-whiteß shadow-md"
        />
      </div>
    </header>
  );
};

export default Header;
