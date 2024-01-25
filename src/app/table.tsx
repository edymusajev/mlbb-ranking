"use client";

import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Image from "next/image";
import { useState } from "react";
import { Hero } from "./lib/definitions";
import { RankData } from "./lib/data";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  ChevronUpIcon,
} from "lucide-react";

const columnHelper = createColumnHelper<Hero>();

const columns = [
  columnHelper.accessor("avatar", {
    cell: (info) => info.getValue(),
    header: () => "Avatar",
  }),
  // columnHelper.accessor("name", {
  //   cell: (info) => info.getValue(),
  //   header: () => "Name",
  // }),
  columnHelper.accessor("win", {
    cell: (info) => `${Math.round(parseFloat(info.getValue()))}%`,
    header: () => "Win",
  }),
  columnHelper.accessor("use", {
    cell: (info) => `${Math.round(parseFloat(info.getValue()) * 10) / 10}%`,
    header: () => "Use",
  }),
  columnHelper.accessor("ban", {
    cell: (info) => `${Math.round(parseFloat(info.getValue()) * 10) / 10}%`,
    header: () => "Ban",
  }),
];

export const RankingTable = ({ data }: { data: RankData }) => {
  const lastFetched = formatDistanceToNow(new Date(data.date));
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data.heroes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mx-2 text-end">
        Last updated: {lastFetched} ago
      </p>
      <Table className="overflow-auto">
        <TableHeader className="sticky top-0 z-10 bg-secondary overflow-auto">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="cursor-pointer"
                  key={header.id}
                  {...{
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>

                    <span>
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  </span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="font-medium">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
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
                        className="rounded"
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ChevronUpIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
