import type { FilterField, FilterOperator } from './segment-types';

export interface FilterFieldDefinition {
  value: FilterField;
  label: string;
  category: 'Engagement' | 'Orders' | 'Demographics' | 'Marketing' | 'Tags';
  operators: FilterOperator[];
  valueType: 'text' | 'number' | 'date' | 'boolean' | 'activity';
}

export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  is: 'is', is_not: 'is not', contains: 'contains', greater_than: 'is greater than', less_than: 'is less than', before: 'is before', after: 'is after',
};

export const FILTER_FIELDS: FilterFieldDefinition[] = [
  { value: 'activityStatus', label: 'Activity status', category: 'Engagement', operators: ['is', 'is_not'], valueType: 'activity' },
  { value: 'eventsPurchased', label: 'Events purchased', category: 'Engagement', operators: ['greater_than', 'less_than', 'is'], valueType: 'number' },
  { value: 'eventsAttended', label: 'Events attended', category: 'Engagement', operators: ['greater_than', 'less_than', 'is'], valueType: 'number' },
  { value: 'totalSpend', label: 'Lifetime spend', category: 'Orders', operators: ['greater_than', 'less_than', 'is'], valueType: 'number' },
  { value: 'lastActivity', label: 'Last activity', category: 'Engagement', operators: ['before', 'after', 'is'], valueType: 'date' },
  { value: 'city', label: 'City', category: 'Demographics', operators: ['is', 'is_not', 'contains'], valueType: 'text' },
  { value: 'subscribedEmail', label: 'Email subscription', category: 'Marketing', operators: ['is'], valueType: 'boolean' },
  { value: 'tags', label: 'Tag', category: 'Tags', operators: ['contains', 'is_not'], valueType: 'text' },
];
