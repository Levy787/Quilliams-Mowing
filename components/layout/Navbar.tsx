
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Grid2X2, Leaf, FileText } from "lucide-react";
import { useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavbarSearch } from "@/components/layout/NavbarSearch";

const mobileNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

function NavListItem({
    title,
    href,
    children,
}: {
    title: string;
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors",
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    )}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

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
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/" className={navigationMenuTriggerStyle()}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4 md:w-105 md:grid-cols-2">
                                            <NavListItem href="/services" title="All Services">
                                                Explore gardening and landscaping services.
                                            </NavListItem>
                                            <NavListItem href="/quote" title="Free Quote">
                                                Get a fast, no-obligation quote.
                                            </NavListItem>
                                            <NavListItem href="/appointment" title="Book Appointment">
                                                Pick a time that suits you.
                                            </NavListItem>
                                            <NavListItem href="/contact" title="Contact">
                                                Ask a question or discuss your project.
                                            </NavListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4 md:w-105 md:grid-cols-2">
                                            <NavListItem href="/projects" title="Recent Work">
                                                See recent transformations and builds.
                                            </NavListItem>
                                            <NavListItem href="/quote" title="Start a Project">
                                                Tell us what you need and we’ll help.
                                            </NavListItem>
                                            <NavListItem href="/about" title="About">
                                                Learn about our approach and values.
                                            </NavListItem>
                                            <NavListItem href="/contact" title="Get in Touch">
                                                Reach out to discuss details.
                                            </NavListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/about" className={navigationMenuTriggerStyle()}>
                                            About
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/contact" className={navigationMenuTriggerStyle()}>
                                            Contact
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
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
                                <FileText className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </Button>

                        {/* Grid/Menu Icon */}
                        <button
                            className="p-2 text-muted-foreground hover:text-primary transition-colors lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <Grid2X2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <ul className="flex flex-col gap-4">
                            {mobileNavItems.map((item) => (
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
                                <FileText className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}