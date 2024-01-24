"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "All",
  },
  {
    href: "/mythic",
    label: "Mythic+",
  },
  {
    href: "/mythic-glory",
    label: "Mythic Glory",
  },
];

export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx({
                "font-bold": pathname === href,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
