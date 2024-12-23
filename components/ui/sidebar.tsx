'use client';

import {usePathname} from 'next/navigation'
import {NavItem} from './nav-item'
import {cn} from '@/lib/utils'
import * as Icons from 'lucide-react'
import {Menu} from 'lucide-react'
import {ScrollArea} from './scroll-area'
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from './sheet'
import {Button} from './button'
import React from "react";

interface SidebarProps {
    navigation: {
        title: string
        items?: {
            name: string
            href: string
            icon?: keyof typeof Icons
            badge?: string
        }[]
    }[]
    footer?: React.ReactNode
    className?: string
}

export function Sidebar({
                            navigation,
                            footer,
                            className
                        }: SidebarProps) {
    const pathname = usePathname()

    const SidebarContent = (
        <aside className={cn(
            "flex h-full flex-col bg-background border-r",
            className
        )}>
            <ScrollArea className="flex-1">
                <div className="space-y-6 py-4">
                    {navigation.map((section) => (
                        <div key={section.title} className="px-3 space-y-2">
                            <h2 className="text-sm font-medium text-muted-foreground px-4">
                                {section.title}
                            </h2>
                            <nav className="space-y-1">
                                {section.items?.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        href={item.href}
                                        icon={item.icon}
                                        name={item.name}
                                        badge={item.badge}
                                        isActive={pathname === item.href}
                                    />
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {footer && <div className="px-3 py-2 border-t">{footer}</div>}
        </aside>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64">
                {SidebarContent}
            </div>

            {/* Mobile Menu Button */}
            <div
                className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="-ml-2">
                            <Menu className="h-6 w-6"/>
                            <span className="sr-only">Open sidebar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        {SidebarContent}
                    </SheetContent>
                </Sheet>

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <div className="flex flex-1"></div>
                </div>
            </div>
        </>
    )
}
