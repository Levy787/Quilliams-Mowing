
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FileText, Grid2X2 } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NavbarSearch } from "@/components/layout/NavbarSearch";

const DEFAULT_NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
] as const;

type NavItem = { label: string; href: string };

export function Navbar({
    logoSrc = "/logos/logo-icon-text.webp",
    logoAlt = "Quilliams Gardening & Landscaping",
    navItems = DEFAULT_NAV_ITEMS,
    primaryCtaLabel = "Get a Quote",
    primaryCtaHref = "/quote",
}: {
    logoSrc?: string;
    logoAlt?: string;
    navItems?: ReadonlyArray<NavItem>;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
} = {}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-16 w-64">
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                fill
                                className="object-contain"
                                sizes="176px"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Menu - Center */}
                    <div className="hidden lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        <NavbarSearch />

                        {/* Let's Talk Button */}
                        <Button className="hidden md:inline-flex" asChild>
                            <Link href={primaryCtaHref}>
                                {primaryCtaLabel}
                                <FileText className="w-4 h-4" aria-hidden />
                            </Link>
                        </Button>

                        {/* Grid/Menu Icon */}
                        <button
                            className="p-2 text-muted-foreground hover:text-primary transition-colors lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <Grid2X2 className="w-5 h-5" aria-hidden />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between text-foreground font-medium hover:text-primary transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button className="mt-4 w-full" size="lg" asChild>
                            <Link href={primaryCtaHref} onClick={() => setMobileMenuOpen(false)}>
                                {primaryCtaLabel}
                                <FileText className="w-4 h-4" aria-hidden />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}