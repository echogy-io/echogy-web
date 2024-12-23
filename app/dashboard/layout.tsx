import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import {Sidebar} from '@/components/ui/sidebar'
import {NavigationConfig} from "@/config/NavConfig";
import React from "react";

interface UserAccountProps {
    email?: string;
    name?: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ email, name }) => (
    <div className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-medium text-primary">
                {name?.[0]?.toUpperCase() || email?.[0]?.toUpperCase() || 'U'}
            </span>
        </div>
        <div className="flex flex-col">
            <span className="font-medium text-foreground">
                {name || email || 'User Account'}
            </span>
            <span className="text-xs">Manage your account</span>
        </div>
    </div>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/sign-in')
    }

    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar 
                    navigation={NavigationConfig.sidebarNav} 
                    footer={
                        <UserAccount 
                            email={user?.email} 
                            name={user?.user_metadata?.name}
                        />
                    }
                />
                <main className="flex-1">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
