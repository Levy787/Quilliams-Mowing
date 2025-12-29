
import Link from "next/link";
import { MapPin, Calendar, Clock } from "lucide-react";

export function Banner() {
    return (
        <div className="bg-green-600 text-white mx-16 rounded-b-4xl">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-12 text-sm font-medium">
                    {/* Left Side Content */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            <span>Apple St, New York, NY 10012, USA</span>
                        </div>

                        <div className="w-px h-4 bg-white/30" aria-hidden="true" />

                        <Link
                            href="/appointment"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>Make An Appointment</span>
                        </Link>
                    </div>

                    {/* Right Side Content */}
                    <div className="flex items-center gap-6 ml-auto">
                        <Link
                            href="/messages"
                            className="hidden lg:block hover:opacity-80 transition-opacity"
                        >
                            Messages
                        </Link>

                        <Link
                            href="/favorites"
                            className="hidden lg:block hover:opacity-80 transition-opacity"
                        >
                            Favorites
                        </Link>

                        <Link
                            href="/auth"
                            className="hidden md:block hover:opacity-80 transition-opacity"
                        >
                            Sign in or Register
                        </Link>

                        <Link
                            href="/quote"
                            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            <span>Get A Quote</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}