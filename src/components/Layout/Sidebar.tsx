"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg p-6 fixed left-0 top-0 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/images/demo/logo.jpeg"
            alt="Avatar"
            width={60}
            height={60}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="text-xl mt-3 font-bold tracking-wide text-center">
            OneClick<span className="text-orange-400">Drive</span>
          </h2>
        </div>

        <nav className="flex flex-col space-y-3">
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard"
                ? "bg-orange-500 text-white font-semibold shadow"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/demo"
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard/demo"
                ? "bg-orange-500 text-white font-semibold shadow"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            Demo Screen
          </Link>
        </nav>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
