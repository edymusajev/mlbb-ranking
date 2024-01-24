"use client";

import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Hero } from "./page";
import Image from "next/image";
import { useState } from "react";

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
    cell: (info) => `${Math.round(parseFloat(info.getValue()))}%`,
    header: () => "Win",
  }),
  columnHelper.accessor("use", {
    cell: (info) => `${Math.round(parseFloat(info.getValue()) * 10) / 10}%`,
    header: () => "Use",
  }),
  columnHelper.accessor("ban", {
    cell: (info) => `${Math.round(parseFloat(info.getValue()))}%`,
    header: () => "Ban",
  }),
];

export const Table = ({ data }: { data: Hero[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  {...{
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
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
                        width={60}
                        height={60}
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
