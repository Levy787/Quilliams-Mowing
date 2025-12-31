
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

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-10 w-44">
                            <Image
                                src="/logos/logo-icon-text.webp"
                                alt="Quilliams Gardening & Landscaping"
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
                                {NAV_ITEMS.map((item) => (
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
                            <Link href="/quote">
                                Get a Quote
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
                            {NAV_ITEMS.map((item) => (
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
                            <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                                Get a Quote
                                <FileText className="w-4 h-4" aria-hidden />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}