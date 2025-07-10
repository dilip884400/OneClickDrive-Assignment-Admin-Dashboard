"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const handleLoginClick = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email's not valid. Please recheck.");

      return;
    }

    setError("");
    document.cookie = `admin=${email}; path=/`;

    toast.success("Login Success!!");
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: "url('/images/cars/login-car-6.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-fit mx-auto bg-orange-100 p-2 rounded-full">
            <Lock className="text-orange-500 w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold mt-2">Admin Login</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full  py-2 border px-3  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        <button
          onClick={handleLoginClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Mock/Demo login for access dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
