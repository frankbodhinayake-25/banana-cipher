"use client"; 

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear user info
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Reset state to default
    setUser({
      username: "User",
      avatar: getDicebearAvatar("User"),
    });
    setDropdownOpen(false);
  };

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

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
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
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-yellow-400 rounded shadow-lg flex flex-col">
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 text-left hover:bg-red-500 transition rounded-t"
              >
                 Logout
              </button>
              <Link
                href="/profile"
                className="text-white px-4 py-2 text-left hover:bg-gray-700 transition rounded-b"
              >
                 Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}