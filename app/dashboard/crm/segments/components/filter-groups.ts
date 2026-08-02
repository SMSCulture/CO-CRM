import { BarChart3, Sparkles, ShoppingCart, Users, Megaphone, Tag, History } from "lucide-react";

export interface FilterGroup {
  key: string;
  label: string;
  subtitle: string;
  icon: typeof BarChart3;
  options: string[];
  /** Tags render as badge chips instead of full-width boxes. */
  asChips?: boolean;
}

export const FILTER_GROUPS: FilterGroup[] = [
  {
    key: "engagement",
    label: "Engagement",
    subtitle: "how they interact with culture",
    icon: BarChart3,
    options: ["Event engagement", "Total events", "Events purchased", "Events not purchased"],
  },
  {
    key: "interests",
    label: "Interests",
    subtitle: "what they care about",
    icon: Sparkles,
    options: ["Music", "Art", "Theater", "Dance"],
  },
  {
    key: "orders",
    label: "Orders",
    subtitle: "transactional behavior",
    icon: ShoppingCart,
    options: ["Ticket purchased", "Total spent", "Total donations", "Last purchase date"],
  },
  {
    key: "demographics",
    label: "Demographics",
    subtitle: "who they are",
    icon: Users,
    options: ["City", "Age"],
  },
  {
    key: "marketing",
    label: "Marketing",
    subtitle: "how you reach them",
    icon: Megaphone,
    options: ["Has Email", "SMS/Text", "Follower"],
  },
  {
    key: "tags",
    label: "Tags",
    subtitle: "internal classification",
    icon: Tag,
    options: ["VIP", "Donor", "Member", "Volunteer", "Board", "New"],
    asChips: true,
  },
  {
    key: "history",
    label: "History",
    subtitle: "timeline & recency",
    icon: History,
    options: ["Contact added"],
  },
];
