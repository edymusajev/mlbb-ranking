import { getData } from "../lib/data";
import { RankingTable } from "../table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mythic Glory",
};

export default async function Home() {
  const data = await getData(2);
  return (
    <main>
      <RankingTable data={data} />
    </main>
  );
}
