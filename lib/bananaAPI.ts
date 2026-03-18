export async function getPuzzle() {
  const res = await fetch("https://marcconrad.com/uob/banana/api.php");

  if (!res.ok) {
    throw new Error("Failed to fetch puzzle");
  }

  const data = await res.json();

  return data;
}