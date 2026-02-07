import { Star, Shield, MapPin, Zap } from "lucide-react";

export function TrustBar() {
    return (
        <div className="bg-muted/50 py-4 border-b">
            <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">5.0</span>
                    <span className="hidden sm:inline">on Google</span>
                </span>
                
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
            </div>
        </div>
    );
}
