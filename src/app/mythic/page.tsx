import { getData } from "../lib/data";
import { Table } from "../table";

export default async function Home() {
  const data = await getData(1);
  return (
    <main>
      <Table data={data} />
    </main>
  );
}
