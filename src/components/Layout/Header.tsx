"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
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
          <span className="text-sm font-medium text-gray-800">Admin</span>
          <span className="text-xs text-gray-500">Manager</span>
        </div>
        <Image
          src="/images/demo/logo.jpeg"
          alt="Admin Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover border-2 border-orange-500 shadow-md hover:scale-105 transition-transform"
        />
      </div>
    </header>
  );
};

export default Header;
