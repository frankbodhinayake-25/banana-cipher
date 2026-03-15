import mongoose, { Schema, Document } from "mongoose";

export interface IPuzzle extends Document {
  sessionId: mongoose.Types.ObjectId;
  puzzleImage: string;
  correctAnswer: number;
  playerAnswer: number;
  isCorrect: boolean;
  responseTime: number;
}

const PuzzleSchema = new Schema<IPuzzle>({
  sessionId: { type: Schema.Types.ObjectId, ref: "GameSession" },

  puzzleImage: String,

  correctAnswer: Number,

  playerAnswer: Number,

  isCorrect: Boolean,

  responseTime: Number,
});

export default mongoose.models.Puzzle ||
  mongoose.model<IPuzzle>("Puzzle", PuzzleSchema);