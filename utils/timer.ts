export function getTimeLeft(startTime: number, limit = 15) {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  return Math.max(limit - elapsed, 0);
}