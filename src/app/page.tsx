import Image from "next/image";
import { Table } from "./table";

export type Hero = {
  id: number;
  avatar: string;
  name: string;
  win: string;
  use: string;
  ban: string;
};

const getData = async () => {
  const res = await fetch("https://api.mobilelegends.com/m/hero/getRankData", {
    method: "POST",
    body: JSON.stringify({
      lang: "en",
      type: 2,
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

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <main className="container p-2">
      <Table data={data} />
    </main>
  );
}
