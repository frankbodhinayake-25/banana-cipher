"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Player {
  _id: string;
  username: string;
  maxStreak: number;
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();

      if (data.success) {
        setPlayers(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  };

  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white">
      <Navbar />

      <div className="flex-1 flex flex-col items-center px-4 py-10">

        <h1 className="text-4xl font-bold text-yellow-400 mb-15">
           Leaderboard
        </h1>

        {/* 🏆 MODERN PODIUM */}
        <div className="flex items-end justify-center gap-10 mb-14">

          {/* 🥈 SECOND PLACE */}
          {top3[1] && (
            <div className="flex flex-col items-center transform translate-y-6 scale-95 opacity-90 hover:scale-100 transition-all duration-300">
              
              <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-2xl shadow-lg">
                👤
              </div>

              <p className="mt-3 font-bold">{top3[1].username}</p>
              <p className="text-green-400">🔥 {top3[1].maxStreak}</p>
            </div>
          )}

          {/* 🥇 FIRST PLACE */}
          {top3[0] && (
            <div className="flex flex-col items-center relative scale-110 hover:scale-125 transition-all duration-300">

              {/* 👑 Crown */}
              <div className="absolute -top-6 text-3xl animate-bounce">
                👑
              </div>

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl shadow-xl border-4 border-yellow-300">
                😎
              </div>

              <p className="mt-4 text-lg font-bold">{top3[0].username}</p>
              <p className="text-green-400 font-bold">
                🔥 {top3[0].maxStreak}
              </p>
            </div>
          )}

          {/* 🥉 THIRD PLACE */}
          {top3[2] && (
            <div className="flex flex-col items-center transform translate-y-8 scale-90 opacity-80 hover:scale-100 transition-all duration-300">
              
              <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-2xl shadow-lg">
                👤
              </div>

              <p className="mt-3 font-bold">{top3[2].username}</p>
              <p className="text-green-400">🔥 {top3[2].maxStreak}</p>
            </div>
          )}

        </div>

        {/* 📋 REST OF PLAYERS */}
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 shadow-lg">

          <h2 className="text-xl font-bold text-purple-400 mb-4 text-center">
            Top Players
          </h2>

          {rest.map((player, index) => (
            <div
              key={player._id}
              className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-purple-700/30 transition-all duration-200"
            >
              {/* Rank */}
              <span className="text-yellow-400 font-bold w-10">
                #{index + 4}
              </span>

              {/* Name */}
              <span className="flex-1 text-center">
                {player.username}
              </span>

              {/* Streak */}
              <span className="text-green-400 font-bold">
                🔥 {player.maxStreak}
              </span>
            </div>
          ))}

        </div>

      </div>

      <Footer />
    </div>
  );
}