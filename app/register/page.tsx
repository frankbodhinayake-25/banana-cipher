"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and cannot contain symbols."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (!emailRegex.test(email)) {
      alert("Email must be valid and end with @gmail.com.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white flex flex-col items-center justify-center">
      <form onSubmit={handleRegister} className="bg-gray-900 p-8 rounded w-96">
        
        {/* ✅ Centered heading */}
        <h2 className="text-2xl mb-6 text-yellow-400 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 text-white bg-black border border-yellow-400 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 text-white bg-black border border-yellow-400 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-1 text-white bg-black border border-yellow-400 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {passwordError && (
          <p className="text-red-400 text-sm mb-3">{passwordError}</p>
        )}

        <button className="w-full bg-yellow-400 text-black mt-4 mb-4 p-2 font-bold rounded">
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-400 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}