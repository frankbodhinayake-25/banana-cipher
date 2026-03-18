"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    // Example: check if user token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleStartGame = () => {
    if (isLoggedIn) {
      router.push("/game");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white">

      {/* Navbar at the top */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        {/* Title */}
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">
          🍌 BananaCipher
        </h1>

        <p className="mb-10 text-gray-300 text-center">
          Crack the Cipher. Claim the Bananas.
        </p>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 w-64">

          <button
            onClick={handleStartGame}
            className="bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300 transition"
          >
            ▶ Start Game
          </button>

          <button
            onClick={() => router.push("/leaderboard")}
            className="bg-gray-800 border border-yellow-400 py-3 rounded hover:bg-gray-700 transition"
          >
            🏆 Leaderboard
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="bg-gray-800 border border-yellow-400 py-3 rounded hover:bg-gray-700 transition"
          >
            👤 Profile
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-red-500 py-3 rounded font-bold hover:bg-red-400 transition"
          >
            🚪 Logout
          </button>

        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-500">
          © 2026 BananaCipher
        </p>
      </div>
    </div>
  );
}