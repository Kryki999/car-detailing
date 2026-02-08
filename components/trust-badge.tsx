import { Star, Facebook, Instagram, Users } from "lucide-react"

interface TrustBadgeProps {
    ratingText?: string // e.g. "4.9 na Google"
    ratingIcon?: "star" | "none"
    reviewCountText?: string // e.g. "(75 opinii)"
    followersText?: string // e.g. "1000+ obserwujących"
    showSocialIcons?: boolean
    className?: string
}

export function TrustBadge({
    ratingText = "4.9 na Google",
    ratingIcon = "star",
    reviewCountText = "(75 opinii)",
    followersText = "1000+ obserwujących",
    showSocialIcons = true,
    className = ""
}: TrustBadgeProps) {
    return (
        <div className={`inline-flex flex-col gap-3 ${className}`}>
            {/* Rating Line */}
            {ratingText && (
                <div className="flex items-center gap-2">
                    {ratingIcon === "star" && (
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    )}
                    <span className="font-bold text-lg text-foreground">{ratingText}</span>
                    {reviewCountText && (
                        <span className="text-muted-foreground/70 text-sm">{reviewCountText}</span>
                    )}
                </div>
            )}

            {/* Social Proof Line */}
            {followersText && (
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="font-bold text-lg text-foreground">{followersText}</span>
                    {showSocialIcons && (
                        <div className="flex items-center gap-2">
                            <Facebook className="w-5 h-5 text-muted-foreground hover:text-[#1877F2] transition-colors cursor-pointer" />
                            <Instagram className="w-5 h-5 text-muted-foreground hover:text-[#E4405F] transition-colors cursor-pointer" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
