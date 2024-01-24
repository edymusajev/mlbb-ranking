import { Hero } from "./definitions";

export const getData = async (type: 0 | 1 | 2) => {
  const res = await fetch("https://api.mobilelegends.com/m/hero/getRankData", {
    method: "POST",
    body: JSON.stringify({
      lang: "en",
      type,
      language: "en",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  // return data.data.data where win rate is ordered from highest to lowest
  return data.data.data.sort((a: Hero, b: Hero) => {
    return parseFloat(b.win) - parseFloat(a.win);
  });
};
