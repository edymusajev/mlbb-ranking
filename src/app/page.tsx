import { RankingTable } from "./table";
import { getData } from "./lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All | ML Meta Ranking",
};

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const data = await getData(0);
  return (
    <main>
      <RankingTable data={data} />
    </main>
  );
}
