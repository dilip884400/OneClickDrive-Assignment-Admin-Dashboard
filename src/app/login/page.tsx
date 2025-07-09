"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Login | Mock Dashboard";
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    document.cookie = `admin=${email}; path=/`;
    toast.success("Logged in successfully!");
    router.push("/dashboard");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/cars/login-car-6.jpg')",
      }}
    >
      <div className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🔐 Mock Admin Login
        </h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-orange-500 rounded hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-700">
          This is a mock login for admin dashboard demo.
        </p>
      </div>
    </div>
  );
}
