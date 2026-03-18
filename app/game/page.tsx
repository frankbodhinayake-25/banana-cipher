"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PuzzleImage from "@/components/PuzzleImage";
import Timer from "@/components/Timer";
import ScoreBoard from "@/components/ScoreBoard";
import AnswerInput from "@/components/AnswerInput";
import { getPuzzle } from "@/lib/bananaAPI";
import { calculateScore } from "@/utils/scoringSystem";

type Difficulty = "easy" | "medium" | "hard";

export default function GamePage() {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [solution, setSolution] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const getDuration = () => {
    if (difficulty === "easy") return 20;
    if (difficulty === "medium") return 12;
    return 7;
  };

  const fetchPuzzle = async () => {
    const data = await getPuzzle();
    setPuzzle(data.question);
    setSolution(data.solution);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (difficulty) fetchPuzzle();
  }, [difficulty]);

  const handleAnswer = (answer: number) => {
    if (gameOver) return;

    if (answer === solution) {
      const timeLeft = Math.max(
        getDuration() - Math.floor((Date.now() - startTime) / 1000),
        0
      );

      const gained = calculateScore(timeLeft, streak + 1);
      setScore((prev) => prev + gained);
      setStreak((prev) => prev + 1);

      fetchPuzzle();
    } else {
      setGameOver(true);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setGameOver(false);
    fetchPuzzle();
  };

  // 🎮 Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white flex flex-col items-center justify-center">

        <h1 className="text-4xl text-yellow-400 font-bold mb-8">
          🍌 BananaCipher
        </h1>

        <p className="mb-6">Select Difficulty</p>

        <div className="flex gap-4">
          <button
            onClick={() => setDifficulty("easy")}
            className="bg-green-500 px-6 py-2 rounded font-bold"
          >
            Easy
          </button>

          <button
            onClick={() => setDifficulty("medium")}
            className="bg-yellow-500 px-6 py-2 rounded font-bold"
          >
            Medium
          </button>

          <button
            onClick={() => setDifficulty("hard")}
            className="bg-red-500 px-6 py-2 rounded font-bold"
          >
            Hard
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10">

        <ScoreBoard score={score} streak={streak} />

        <Timer
          startTime={startTime}
          duration={getDuration()}
          onTimeUp={handleTimeUp}
        />

        {puzzle && <PuzzleImage image={puzzle} />}

        {!gameOver ? (
          <AnswerInput onSubmit={handleAnswer} />
        ) : (
          <div className="text-center mt-6">

            <h2 className="text-red-500 text-2xl mb-4">
              💀 Game Over
            </h2>

            <p className="mb-4">Final Score: {score}</p>

            <button
              onClick={restartGame}
              className="bg-yellow-400 px-6 py-2 text-black font-bold rounded"
            >
              Restart
            </button>

          </div>
        )}

      </div>

    </div>
  );
}