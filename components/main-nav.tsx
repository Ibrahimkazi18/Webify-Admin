"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const MainNav = ({className, ...props} : React.HtmlHTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href : `/${params.storeId}`,
            label : "Overview",
            active : pathname === `/${params.storeId}`,
        },
        {
            href : `/${params.storeId}/websites`,
            label : "Websites",
            active : pathname === `/${params.storeId}/websites`,
        },
        {
            href : `/${params.storeId}/users`,
            label : "Users",
            active : pathname === `/${params.storeId}/users`,
        },
        {
            href : `/${params.storeId}/requests`,
            label : "Requests",
            active : pathname === `/${params.storeId}/requests`,
        },
        {
            href : `/${params.storeId}/plans`,
            label : "Plans",
            active : pathname === `/${params.storeId}/plans`,
        },
        {
            href : `/${params.storeId}/memberships`,
            label : "Memberships",
            active : pathname === `/${params.storeId}/memberships`,
        },
        {
            href : `/${params.storeId}/settings`,
            label : "Settings",
            active : pathname === `/${params.storeId}/settings`,
        },
    ]


    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 pl-6")}>
            {routes.map(route => (
                <Link key={route.href}
                      href={route.href} 
                      className={cn("text-sm font-medium transition-colors hover:text-primary",
                                    route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav