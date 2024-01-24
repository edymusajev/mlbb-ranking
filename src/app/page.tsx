import { Table } from "./table";
import { getData } from "./lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All | ML Meta Ranking",
};

export default async function Home() {
  const data = await getData(0);
  return (
    <main>
      <Table data={data} />
    </main>
  );
}
