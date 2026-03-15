import mongoose, { Schema, Document } from "mongoose";

export interface IGameSession extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  puzzlesSolved: number;
  maxStreak: number;
  startTime: Date;
  endTime?: Date;
}

const GameSessionSchema = new Schema<IGameSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },

  score: { type: Number, default: 0 },

  puzzlesSolved: { type: Number, default: 0 },

  maxStreak: { type: Number, default: 0 },

  startTime: { type: Date, default: Date.now },

  endTime: { type: Date },
});

export default mongoose.models.GameSession ||
  mongoose.model<IGameSession>("GameSession", GameSessionSchema);