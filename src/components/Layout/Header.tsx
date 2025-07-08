"use client";

import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-800">Welcome to Dashboard</h1>

      <div className="flex items-center space-x-3">
        <span>Admin</span>
        <Image
          src="/images/demo/logo.jpeg"
          alt="Avatar"
          width={36}
          height={36}
          className="rounded-full object-cover border-2 border-black"
        />
      </div>
    </header>
  );
};

export default Header;
