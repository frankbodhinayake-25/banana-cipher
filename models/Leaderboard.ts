import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  score: number;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },

  username: String,

  score: Number,

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Leaderboard ||
  mongoose.model<ILeaderboard>("Leaderboard", LeaderboardSchema);