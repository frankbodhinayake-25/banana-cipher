"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-8 rounded w-96"
      >

        <h2 className="text-2xl mb-6 text-yellow-400">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 text-black"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-yellow-400 text-black p-2">
          Register
        </button>

      </form>

    </div>
  );
}