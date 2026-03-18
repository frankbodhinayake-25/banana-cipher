"use client";

export default function ScoreBoard({
  score,
  streak,
}: {
  score: number;
  streak: number;
}) {
  return (
    <div className="flex justify-between w-full max-w-md mb-4">

      <div className="text-yellow-400 font-bold">
        🍌 Score: {score}
      </div>

      <div className="text-green-400 font-bold">
        🔥 Streak: {streak}
      </div>

    </div>
  );
}