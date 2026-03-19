"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Dicebear avatar
const getDicebearAvatar = (username: string) =>
  `https://api.dicebear.com/6.x/bottts/svg?seed=${encodeURIComponent(
    username
  )}&backgroundColor=transparent`;

export default function Navbar() {
  const [user, setUser] = useState<{ username: string; avatar: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();

        if (data.user) {
          setUser({
            username: data.user.username,
            avatar: getDicebearAvatar(data.user.username),
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchUser();

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/login";
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
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              {user ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-purple-900 font-bold flex items-center justify-center h-full">
                  G
                </span>
              )}
            </div>

            {/* Username */}
            <span className="hidden sm:inline font-medium">
              {user ? user.username : "Guest"}
            </span>
          </div>

          {/* Dropdown */}
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