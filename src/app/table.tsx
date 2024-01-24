"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Hero } from "./page";
import Image from "next/image";

const columnHelper = createColumnHelper<Hero>();

const columns = [
  columnHelper.accessor("avatar", {
    cell: (info) => info.getValue(),
    header: () => "Avatar",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("win", {
    cell: (info) => info.getValue(),
    header: () => "Win Rate",
  }),
];

export const Table = ({ data }: { data: Hero[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {
                    // if avatar render image otherwise render text
                    cell.column.id === "avatar" ? (
                      <Image
                        src={(cell.getValue() as string).replace(
                          /^\/\//,
                          "https://"
                        )}
                        width={80}
                        height={80}
                        alt=""
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
