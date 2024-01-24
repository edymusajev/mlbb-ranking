import { Table } from "./table";
import { getData } from "./lib/data";

export default async function Home() {
  const data = await getData(0);
  return (
    <main>
      <Table data={data} />
    </main>
  );
}
