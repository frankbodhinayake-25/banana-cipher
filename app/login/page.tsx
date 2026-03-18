"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.user) {
      // Store userId in localStorage for game score saving
      localStorage.setItem("userId", data.user._id);
      alert("Login successful!");
      router.push("/game");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded w-96">
        <h2 className="text-2xl mb-6 text-yellow-400">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 text-white bg-black border border-yellow-400 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-white bg-black border border-yellow-400 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-yellow-400 text-black py-2 font-bold rounded">
          Login
        </button>
      </form>
    </div>
  );
}