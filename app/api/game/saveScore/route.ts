import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, score, streak } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 1. Update totalScore (cumulative career points)
    user.totalScore += score;

    // 2. Update maxStreak (highest streak ever reached)
    if (streak > (user.maxStreak || 0)) {
      user.maxStreak = streak;
    }

    // 3. Update highestScore (best single-game performance)
    if (score > (user.highestScore || 0)) {
      user.highestScore = score;
    }

    await user.save(); // This persists the new field to the DB

    return NextResponse.json({
      success: true,
      totalScore: user.totalScore,
      maxStreak: user.maxStreak,
      highestScore: user.highestScore,
    });
  } catch (error) {
    console.error("Save score error:", error);
    return NextResponse.json({ message: "Failed to save score" }, { status: 500 });
  }
}
