"use client"; 

import { useState, useRef, useEffect } from "react";

export default function AnswerInput({
  onSubmit,
}: {
  onSubmit: (answer: number) => void;
}) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  //event handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (answer.trim() === "") return;

    onSubmit(Number(answer));
    setAnswer("");

    inputRef.current?.focus();
  };

  return (
    <form
    //calling handle submit event
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-yellow-400"
    >
      <input
        ref={inputRef}
        type="text"   // ✅ allows numeric typing
        inputMode="numeric"  // ✅ numeric keyboard on mobile
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setAnswer(value);
          }
        }}
        className="w-60 px-4 py-2 rounded bg-black text-white border border-yellow-300 
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 
                   text-center text-lg font-bold" // ✅ increased width
      />

      <button
        type="submit"
        className="bg-yellow-400 px-5 py-2 text-black font-bold rounded 
                   hover:bg-yellow-300 transition active:scale-95"
      >
        Enter
      </button>
    </form>
  );
}