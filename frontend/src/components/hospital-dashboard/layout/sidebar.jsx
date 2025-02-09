import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Calendar,
    BedDouble,
    ClipboardList,
    Box,
    Home,
    Users,
    Activity,
    Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SheetTitle } from "@/components/ui/sheet";

export default function AppSidebar() {
    const location = useLocation();

    const menuItems = [
        {
            id: "appointments",
            icon: Calendar,
            label: "Appointments",
            details: "",
            category: "main",
            path: "/hospital/dashboard/appointments",
        },
        {
            id: "patients",
            icon: Users,
            label: "Patients",
            category: "main",
            path: "/hospital/dashboard/patients",
        },
        {
            id: "requests",
            icon: ClipboardList,
            label: "Requests",
            details: "",
            category: "main",
            path: "/hospital/dashboard/requests",
        },
        {
            id: "inventory",
            icon: Box,
            label: "Inventory",
            details: "",
            category: "management",
            path: "/hospital/dashboard/inventory",
        },
        {
            id: "analytics",
            icon: Activity,
            label: "Analytics",
            category: "management",
            path: "/hospital/dashboard/analytics",
        },
        {
            id: "dashboard",
            icon: Home,
            label: "Overview",
            category: "management",
            path: "/hospital/dashboard/overview",
        },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <Sidebar>
            <SidebarContent>
                <div className="pb-12 h-screen bg-background border-r">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <Link
                                to="/hospital/dashboard"
                                className="block"
                            >
                                <div className="flex items-center px-4 mb-6">
                                    <Building2 className="h-6 w-6 text-primary mr-2" />
                                    <h2 className="text-xl font-bold text-primary">
                                        City Hospital
                                    </h2>
                                </div>
                            </Link>

                            <div className="space-y-4">
                                {/* Main Operations Group */}
                                <div>
                                    <h3 className="px-4 mb-2 text-sm font-medium text-muted-foreground">
                                        Main Operations
                                    </h3>
                                    <div className="space-y-1">
                                        {menuItems
                                            .filter(
                                                (item) =>
                                                    item.category === "main"
                                            )
                                            .map((item) => (
                                                <Button
                                                    key={item.id}
                                                    variant={
                                                        isActivePath(item.path)
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                    className={cn(
                                                        "w-full justify-start transition-colors",
                                                        isActivePath(
                                                            item.path
                                                        ) &&
                                                            "bg-secondary font-medium"
                                                    )}
                                                    asChild
                                                >
                                                    <Link to={item.path}>
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        {item.label}
                                                        {item.details && (
                                                            <span
                                                                className={cn(
                                                                    "ml-auto text-xs px-2 py-0.5 rounded-full",
                                                                    isActivePath(
                                                                        item.path
                                                                    )
                                                                        ? "bg-primary/10 text-primary"
                                                                        : "bg-muted text-muted-foreground"
                                                                )}
                                                            >
                                                                {item.details}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </Button>
                                            ))}
                                    </div>
                                </div>

                                {/* Management Group */}
                                <div>
                                    <h3 className="px-4 mb-2 text-sm font-medium text-muted-foreground">
                                        Management
                                    </h3>
                                    <div className="space-y-1">
                                        {menuItems
                                            .filter(
                                                (item) =>
                                                    item.category ===
                                                    "management"
                                            )
                                            .map((item) => (
                                                <Button
                                                    key={item.id}
                                                    variant={
                                                        isActivePath(item.path)
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                    className={cn(
                                                        "w-full justify-start transition-colors",
                                                        isActivePath(
                                                            item.path
                                                        ) &&
                                                            "bg-secondary font-medium"
                                                    )}
                                                    asChild
                                                >
                                                    <Link to={item.path}>
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        {item.label}
                                                        {item.details && (
                                                            <span
                                                                className={cn(
                                                                    "ml-auto text-xs px-2 py-0.5 rounded-full",
                                                                    isActivePath(
                                                                        item.path
                                                                    )
                                                                        ? "bg-primary/10 text-primary"
                                                                        : "bg-muted text-muted-foreground"
                                                                )}
                                                            >
                                                                {item.details}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
