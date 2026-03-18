"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black border-b border-yellow-400 p-4 flex justify-between">

      <Link href="/" className="text-yellow-400 font-bold">
        🍌 BananaCipher
      </Link>

      <div className="flex gap-4 text-white">
        <Link href="/game">Game</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
      </div>

    </nav>
  );
}