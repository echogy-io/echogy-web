'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface MainNavProps {
  items: {
    name: string
    href: string
  }[]
  className?: string
}

export function MainNav({ items, className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          size="sm"
          asChild
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  )
}
