'use client';

import { cn } from "@/lib/utils";
import { MainNav } from "./main-nav";
import React from "react";

interface HeaderProps {
  logo?: React.ReactNode
  mainNav?: {
    name: string
    href: string
  }[]
  actions?: React.ReactNode
  className?: string
}

export function Header({ 
  logo, 
  mainNav = [],
  actions,
  className 
}: HeaderProps) {
  return (
    <header className={cn(
      "flex h-16 items-center border-b px-4 lg:px-8",
      className
    )}>
      <div className="flex items-center gap-4">
        {logo}
        {mainNav?.length > 0 && (
          <MainNav items={mainNav} />
        )}
      </div>
      
      {actions && (
        <div className="ml-auto flex items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  )
}
