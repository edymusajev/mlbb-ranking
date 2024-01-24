import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NavLinks } from "./nav-links";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ML Meta Ranking",
    default: "ML Meta Ranking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} container p-2 mx-auto`}>
        <NavLinks />
        <>{children}</>
      </body>
    </html>
  );
}
