import { Star, Shield, MapPin, Zap } from "lucide-react";
import {
    GOOGLE_BUSINESS_PROFILE_URL,
    GOOGLE_REVIEW_COUNT,
    GOOGLE_REVIEW_RATING,
} from "@/lib/google-reviews";

const CHECKATRADE_URL = "https://www.checkatrade.com/trades/quilliamsmowingltd";
const YELL_URL = "https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/";
const BARK_URL = "https://www.bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/";

export function TrustBar() {
    return (
        <div className="bg-muted/50 py-4 border-b">
            <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
                <a
                    href={GOOGLE_BUSINESS_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-foreground"
                >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">
                        {GOOGLE_REVIEW_RATING.toFixed(1)}
                    </span>
                    <span className="hidden sm:inline">
                        from {GOOGLE_REVIEW_COUNT} reviews on Google
                    </span>
                    <span className="sm:hidden">Google</span>
                </a>
                
                <span className="hidden sm:inline text-muted-foreground/70">•</span>
                
                <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Fully Insured</span>
                </span>
                
                <span className="hidden sm:inline text-muted-foreground/70">•</span>
                
                <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Local to Newquay</span>
                </span>
                
                <span className="hidden sm:inline text-muted-foreground/70">•</span>
                
                <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Same-week availability</span>
                </span>

                <span className="hidden lg:inline text-muted-foreground/70">•</span>

                <span className="hidden lg:flex items-center gap-3">
                    <a href={CHECKATRADE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        Checkatrade
                    </a>
                    <a href={YELL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        Yell
                    </a>
                    <a href={BARK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        Bark
                    </a>
                </span>
            </div>
        </div>
    );
}
