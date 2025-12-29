
"use client";

import Link from "next/link";
import { ChevronDown, ShoppingCart, Search, ArrowRight, Grid2X2, Leaf } from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "Home", href: "/", hasDropdown: true },
    { label: "Pages", href: "/pages", hasDropdown: true },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Projects", href: "/projects", hasDropdown: true },
    { label: "Contact", href: "/contact", hasDropdown: false },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 bg-white z-50">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                            <Leaf className="w-7 h-7 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">Lawnella</span>
                            <span className="text-xs text-gray-600">Corner of Nature</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Menu - Center */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-gray-900 font-medium hover:text-green-500 transition-colors group"
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <ChevronDown className="w-4 h-4 group-hover:text-green-500" aria-hidden="true" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        {/* Search Icon */}
                        <button
                            className="p-2 hover:text-green-500 transition-colors hidden sm:block"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Let's Talk Button */}
                        <Link
                            href="/contact"
                            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Let&apos;s Talk
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>

                        {/* Grid/Menu Icon */}
                        <button
                            className="p-2 hover:text-green-500 transition-colors lg:hidden"
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
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between text-gray-900 font-medium hover:text-green-500 transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                        {item.hasDropdown && (
                                            <ChevronDown className="w-4 h-4" aria-hidden="true" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 w-full"
                        >
                            Let&apos;s Talk
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}