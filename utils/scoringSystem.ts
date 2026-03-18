export function calculateScore(timeLeft: number, streak: number) {
  let base = 20;

  if (timeLeft > 12) base = 100;
  else if (timeLeft > 8) base = 70;
  else if (timeLeft > 4) base = 40;

  let multiplier = 1;

  if (streak >= 10) multiplier = 3;
  else if (streak >= 5) multiplier = 2;
  else if (streak >= 3) multiplier = 1.5;

  return Math.floor(base * multiplier);
}