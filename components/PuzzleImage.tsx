"use client";

export default function PuzzleImage({ image }: { image: string }) {
  return (
    <div className="flex justify-center mb-6">
      <img
        src={image}
        alt="Puzzle"
        className="border-2 border-yellow-400 rounded-lg"
      />
    </div>
  );
}