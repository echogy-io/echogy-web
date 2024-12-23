'use client';

import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { Badge } from './badge'
import { LucideIcon } from 'lucide-react'
import React from "react";

interface NavItemProps {
  href: string
  icon?: keyof typeof Icons
  name: string
  badge?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export function NavItem({
  href,
  icon,
  name,
  badge,
  isActive,
  onClick,
  className,
  children
}: NavItemProps) {
  const Icon = icon ? (Icons[icon] as LucideIcon) : null

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-md px-4 py-2 text-sm transition-colors",
        isActive
          ? "bg-secondary font-medium text-foreground"
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
        className
      )}
    >
      <span className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4" />}
        {name}
        {children}
      </span>
      {badge && (
        <Badge variant="secondary" className="ml-auto">
          {badge}
        </Badge>
      )}
    </Link>
  );
}
