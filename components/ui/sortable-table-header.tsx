"use client";

import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type SortDirection = 'asc' | 'desc';

interface SortableTableHeaderProps<T extends string = string> {
  children: React.ReactNode;
  sortField: T;
  currentSortField?: T;
  currentSortDirection?: SortDirection;
  onSort: (field: T) => void;
  className?: string;
}

export function SortableTableHeader<T extends string = string>({
  children,
  sortField,
  currentSortField,
  currentSortDirection,
  onSort,
  className,
}: SortableTableHeaderProps<T>) {
  const isSorted = currentSortField === sortField;
  const isAsc = isSorted && currentSortDirection === 'asc';
  const isDesc = isSorted && currentSortDirection === 'desc';

  const handleClick = () => {
    onSort(sortField);
  };

  return (
    <TableHead
      className={cn(
        "cursor-pointer select-none px-4 py-3 text-xs font-semibold text-gray-900 dark:text-foreground uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-muted/30 transition-colors",
        isSorted && "bg-gray-50 dark:bg-white/5",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        <div className="ml-2 flex flex-col">
          {!isSorted && (
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          )}
          {isAsc && (
            <ChevronUp className="h-4 w-4 text-blue-600" />
          )}
          {isDesc && (
            <ChevronDown className="h-4 w-4 text-blue-600" />
          )}
        </div>
      </div>
    </TableHead>
  );
}

interface NonSortableTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function NonSortableTableHeader({
  children,
  className,
}: NonSortableTableHeaderProps) {
  return (
    <TableHead className={cn("px-4 py-3 text-xs font-semibold text-gray-900 dark:text-foreground uppercase tracking-wide", className)}>
      {children}
    </TableHead>
  );
}