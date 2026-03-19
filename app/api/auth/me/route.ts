import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    await connectDB();
    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ user });

  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}