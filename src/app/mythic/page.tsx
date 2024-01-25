import { getData } from "../lib/data";
import { RankingTable } from "../table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mythic+",
};

export default async function Home() {
  const data = await getData(1);
  return (
    <main>
      <RankingTable data={data} />
    </main>
  );
}
