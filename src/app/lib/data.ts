import { Hero } from "./definitions";

type Data = {
  heroes: Hero[];
  date: string;
};

export const getData = async (type: 0 | 1 | 2): Promise<Data> => {
  const res = await fetch("https://api.mobilelegends.com/m/hero/getRankData", {
    next: {
      revalidate: 60 * 15,
    },
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
  const heroes = data.data.data.sort((a: Hero, b: Hero) => {
    return parseFloat(b.win) - parseFloat(a.win);
  });

  return {
    heroes,
    date: res.headers.get("date") ?? "",
  };
};
