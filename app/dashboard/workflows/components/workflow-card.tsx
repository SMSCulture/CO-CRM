import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Workflow } from '@/store/workflow-builder-store';

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link href={`/dashboard/workflows/${workflow.id}`}>
      <Card className="rounded-xl border-border transition-colors hover:border-co-blue/40">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{workflow.name}</p>
              <Badge variant={workflow.isActive ? 'default' : 'secondary'}>
                {workflow.isActive ? 'Active' : 'Draft'}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{workflow.description || 'No description yet.'}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {workflow.nodes.length} nodes · {workflow.edges.length} connections
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}