
import Link from "next/link";
import { MapPin, PhoneCall, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function Banner() {
    return (
        <div className="bg-primary text-primary-foreground mx-4 md:mx-8 lg:mx-16 rounded-b-4xl">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-12 text-sm font-medium">
                    {/* Left Side Content */}
                    <div className="hidden md:flex items-center gap-6">
                        <Button asChild className="flex items-center gap-2" variant="link">
                            <Link
                                href="https://share.google/r1JJ6WEWLcIiI7l0w"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                                <span>Trevarrian, Cornwall</span>
                            </Link>
                        </Button>

                        <div className="w-px h-4 bg-white/30" aria-hidden="true" />

                        <span className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-2.5 py-1 text-xs">
                            Free quote • Fast response
                        </span>
                    </div>

                    {/* Right Side Content */}
                    <div className="flex items-center gap-6 ml-auto">
                        <Button asChild className="flex items-center gap-2" variant="link">
                            <a href="tel:07593121621">
                                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                                <span>Call: 07593 121 621</span>
                            </a>
                        </Button>

                        <div className="w-px h-4 bg-white/30 hidden sm:block" aria-hidden="true" />

                        <Link
                            href="/quote"
                            className={buttonVariants({ variant: "link" })}
                        >
                            <FileText className="w-4 h-4" aria-hidden="true" />
                            <span>Get A Quote</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}