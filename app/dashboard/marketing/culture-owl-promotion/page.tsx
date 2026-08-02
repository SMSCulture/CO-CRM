import Link from "next/link";
import { Mail, Share2, Image as ImageIcon, Star, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PROMOTION_OPTIONS = [
  { href: "/dashboard/marketing/escoops", label: "Book an eScoop", icon: Mail },
  { href: "/dashboard/marketing/social", label: "Request Social Promotion", icon: Share2 },
  { href: "/dashboard/marketing/banners", label: "Add Banner Advertising", icon: ImageIcon },
  { href: "/dashboard/marketing/featured-placement", label: "Secure Featured Placement", icon: Star },
  { href: "/dashboard/marketing/cultural-stories", label: "Request a Cultural Story", icon: BookOpen },
  { href: "/dashboard/marketing/managed-campaign", label: "Build a Managed Promotional Campaign", icon: Sparkles },
] as const;

export default function CultureOwlPromotionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">CultureOwl Promotion</h2>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed distribution — your audience is used as a targeting brief, not a direct send list.
          CultureOwl may extend reach to its broader network of local, high-intent culture lovers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PROMOTION_OPTIONS.map((option) => (
          <Link key={option.href} href={option.href}>
            <Card className="rounded-xl border-border transition-colors hover:border-co-purple/40">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-co-purple/10 text-co-purple">
                  <option.icon className="h-5 w-5" />
                </span>
                <p className="flex-1 font-medium text-foreground">{option.label}</p>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
