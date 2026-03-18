import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    //  Get top 10 users by highest streak
    const topPlayers = await User.find({})
      .sort({ maxStreak: -1 }) // highest first
      .limit(10)
      .select("username maxStreak");

    return NextResponse.json({ success: true, data: topPlayers });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}