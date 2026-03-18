"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";

// Dicebear colorful avatar generator
const getDicebearAvatar = (username: string) =>
  `https://api.dicebear.com/6.x/bottts/svg?seed=${encodeURIComponent(
    username
  )}&backgroundColor=transparent`;

export default function Navbar() {
  // Keep all your links/layouts intact
  const [user, setUser] = useState<{ username: string; avatar: string }>({
    username: "User", // default user
    avatar: getDicebearAvatar("User"), // default avatar
  });

  useEffect(() => {
    // Check for logged-in user in localStorage
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (storedUserId && storedUsername) {
      // Update state with logged-in user
      setUser({
        username: storedUsername,
        avatar: getDicebearAvatar(storedUsername),
      });
    }
  }, []);

  return (
    <nav className="w-full bg-purple-800/30 backdrop-blur-lg border-b border-yellow-300 p-4 flex justify-between items-center">
      <Link href="/" className="text-yellow-400 font-bold text-xl">
        🍌 BananaCipher
      </Link>

      <div className="flex items-center gap-6 text-white">
        <Link
          href="/"
          className="hover:text-yellow-400 transition-colors font-medium"
        >
          Home
        </Link>
        <Link
          href="/leaderboard"
          className="hover:text-yellow-400 transition-colors font-medium"
        >
          Leaderboard
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-purple-900 font-bold flex items-center justify-center h-full">
                {user.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <span className="hidden sm:inline font-medium">{user.username}</span>
        </Link>
      </div>
    </nav>
  );
}