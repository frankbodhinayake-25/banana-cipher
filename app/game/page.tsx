"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import PuzzleImage from "@/components/PuzzleImage";
import Timer from "@/components/Timer";
import ScoreBoard from "@/components/ScoreBoard";
import AnswerInput from "@/components/AnswerInput";
import { getPuzzle } from "@/lib/bananaAPI";

type Difficulty = "easy" | "medium" | "hard";

export default function GamePage() {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [solution, setSolution] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<number | null>(null);

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const getDuration = () => {
    if (difficulty === "easy") return 30;
    if (difficulty === "medium") return 20;
    return 10;
  };

  const fetchPuzzle = async () => {
    const data = await getPuzzle();
    setPuzzle(data.question);
    setSolution(data.solution);
    setStartTime(Date.now());
  };

  useEffect(() => {
    const savedTotal = localStorage.getItem("totalScore");
    if (savedTotal) {
      setTotalScore(parseInt(savedTotal));
    }
  }, []);

  useEffect(() => {
    if (difficulty) fetchPuzzle();
  }, [difficulty]);

  const saveScoreToDB = async (scoreToAdd: number, finalStreak: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch("/api/game/saveScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, score: scoreToAdd, streak: finalStreak }),
      });

      const data = await res.json();
      if (!res.ok) console.error("Save score failed:", data.message);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  const handleAnswer = (answer: number) => {
    if (gameOver) return;

    if (answer === solution) {
      const gained = 10;

      const newScore = score + gained;
      const newTotalScore = totalScore + gained;
      const newStreak = streak + 1;

      setScore(newScore);
      setTotalScore(newTotalScore);
      setStreak(newStreak);
      setLastCorrectAnswer(solution);

      localStorage.setItem("totalScore", newTotalScore.toString());

      fetchPuzzle();

      // ✅ FIX: send only gained score
      saveScoreToDB(gained, newStreak);
    } else {
      setGameOver(true);

      // ✅ FIX: do NOT resend full score
      saveScoreToDB(0, streak);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);

    // ✅ FIX: do NOT resend full score
    saveScoreToDB(0, streak);
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setLastCorrectAnswer(null);
    setGameOver(false);
    fetchPuzzle();
  };

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white flex flex-col">
        <Navbar />

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray-900/80 backdrop-blur-lg p-10 rounded-xl text-center flex flex-col items-center gap-6">
            <h1 className="text-4xl text-yellow-400 font-bold mb-4">
              🍌 BananaCipher
            </h1>
            <p className="text-white text-lg mb-4">Select Difficulty</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDifficulty("easy")}
                className="bg-green-500 px-6 py-2 rounded font-bold hover:scale-105 transition-transform"
              >
                Easy
              </button>
              <button
                onClick={() => setDifficulty("medium")}
                className="bg-yellow-500 px-6 py-2 rounded font-bold hover:scale-105 transition-transform"
              >
                Medium
              </button>
              <button
                onClick={() => setDifficulty("hard")}
                className="bg-red-500 px-6 py-2 rounded font-bold hover:scale-105 transition-transform"
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#000000] text-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10 gap-4 pb-10 flex-1">
        <ScoreBoard score={score} streak={streak} />
        <Timer startTime={startTime} duration={getDuration()} onTimeUp={handleTimeUp} />
        {puzzle && <PuzzleImage image={puzzle} />}
        {!gameOver ? (
          <>
            <AnswerInput onSubmit={handleAnswer} />
            {lastCorrectAnswer !== null && (
              <p className="text-green-400 font-bold mt-2">
                ✅ Correct Answer: {lastCorrectAnswer}
              </p>
            )}
          </>
        ) : (
          <div className="text-center mt-6">
            <h2 className="text-red-500 text-2xl mb-4">💀 Game Over</h2>
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

      <Footer />
    </div>
  );
}