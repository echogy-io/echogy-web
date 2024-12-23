import type { LucideIcon } from 'lucide-react'

export const NavigationConfig = {
  mainNav: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Documentation",
      href: "/docs",
    }
  ],
  sidebarNav: [
    {
      title: "General",
      items: [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: "LayoutDashboard" as const
        },
        {
          name: "Orders",
          href: "/dashboard/orders",
          icon: "ClipboardList" as const,
          badge: "5"
        },
        {
          name: "Products",
          href: "/dashboard/products",
          icon: "Package" as const
        }
      ]
    },
    {
      title: "Settings",
      items: [
        {
          name: "Account",
          href: "/dashboard/account",
          icon: "User" as const
        },
        {
          name: "Notifications",
          href: "/dashboard/notifications",
          icon: "Bell" as const,
          badge: "3"
        },
        {
          name: "Security",
          href: "/dashboard/security",
          icon: "Shield" as const
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          name: "Help",
          href: "/dashboard/help",
          icon: "HelpCircle" as const
        },
        {
          name: "Documentation",
          href: "/dashboard/docs",
          icon: "FileText" as const
        },
        {
          name: "Status",
          href: "/dashboard/status",
          icon: "AlertCircle" as const
        }
      ]
    }
  ]
}
