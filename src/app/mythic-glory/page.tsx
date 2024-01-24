import { getData } from "../lib/data";
import { Table } from "../table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mythic Glory",
};

export default async function Home() {
  const data = await getData(2);
  return (
    <main>
      <Table data={data} />
    </main>
  );
}
