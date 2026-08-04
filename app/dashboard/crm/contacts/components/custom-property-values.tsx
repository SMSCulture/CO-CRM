import { Check, X } from "lucide-react";
import type { CustomPropertyDef } from "../hooks/use-custom-properties";

interface CustomPropertyValuesProps {
  definitions: CustomPropertyDef[];
  values: Record<string, string | number | boolean>;
}

function formatValue(def: CustomPropertyDef, value: string | number | boolean | undefined) {
  if (value === undefined || value === "") return <span className="text-muted-foreground">—</span>;
  if (def.type === "checkbox") {
    return value ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />;
  }
  return <span className="text-foreground">{String(value)}</span>;
}

export function CustomPropertyValues({ definitions, values }: CustomPropertyValuesProps) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {definitions.map((def) => (
        <div key={def.key} className="flex items-center justify-between px-4 py-2.5">
          <span className="text-sm text-muted-foreground">{def.label}</span>
          <span className="text-sm font-medium">{formatValue(def, values[def.key])}</span>
        </div>
      ))}
    </div>
  );
}
