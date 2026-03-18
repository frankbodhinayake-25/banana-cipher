"use client";

import { useEffect, useState } from "react";

export default function Timer({
  startTime,
  duration,
  onTimeUp,
}: {
  startTime: number;
  duration: number;
  onTimeUp: () => void;
}) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        setTime(0);
        onTimeUp();
      } else {
        setTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return (
    <div
      className={`text-xl font-bold mb-4 ${
        time <= 3 ? "text-red-500 animate-pulse" : "text-yellow-400"
      }`}
    >
      ⏱ {time}s
    </div>
  );
}