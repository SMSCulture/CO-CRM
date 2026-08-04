import { Ticket, Heart, Eye, ClipboardCheck, Mail, PartyPopper, HeartHandshake } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Activity, ActivityType } from "../hooks/use-contact-activities";

const ACTIVITY_CONFIG: Record<ActivityType, { icon: typeof Ticket; color: string }> = {
  ticket_purchase: { icon: Ticket, color: "text-success" },
  donation: { icon: HeartHandshake, color: "text-co-purple" },
  event_view: { icon: Eye, color: "text-info" },
  registration: { icon: ClipboardCheck, color: "text-co-blue" },
  email_open: { icon: Mail, color: "text-muted-foreground" },
  attendance: { icon: PartyPopper, color: "text-warning" },
  favorite: { icon: Heart, color: "text-co-pink" },
};

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No activity yet.</p>;
  }

  return (
    <ScrollArea className="h-[360px] pr-3">
      <div className="space-y-4">
        {activities.map((activity) => {
          const { icon: Icon, color } = ACTIVITY_CONFIG[activity.type];
          return (
            <div key={activity.id} className="flex gap-3">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ${color}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                  {activity.venue ? ` · ${activity.venue}` : ""}
                  {activity.amount ? ` · $${activity.amount.toLocaleString()}` : ""}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
