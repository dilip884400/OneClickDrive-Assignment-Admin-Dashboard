"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
      <div className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-orange-100 p-3 rounded-full">
            <Lock className="text-orange-500 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500">
            Enter your email to access the dashboard
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-orange-500 rounded hover:bg-orange-600 transition-all duration-200 font-medium"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-600">
          This is a mock login for admin dashboard.
        </p>
      </div>
    </div>
  );
}
