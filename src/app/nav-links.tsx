"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SwordsIcon } from "lucide-react";

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
  const style = navigationMenuTriggerStyle();
  return (
    <header className="mb-4 container py-2 flex justify-between items-center">
      <span className="flex items-center space-x-2">
        <SwordsIcon className="w-5 h-5" />
        <span className="font-semibold antialiased tracking-wider">
          ML Meta
        </span>
      </span>

      <NavigationMenu>
        <NavigationMenuList>
          {links.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), {
                    "bg-secondary": pathname === href,
                  })}
                >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
