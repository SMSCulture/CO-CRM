export type FilterField = 'activityStatus' | 'tags' | 'city' | 'totalSpend' | 'eventsPurchased' | 'eventsAttended' | 'lastActivity' | 'subscribedEmail';
export type FilterOperator = 'is' | 'is_not' | 'contains' | 'greater_than' | 'less_than' | 'before' | 'after';
export type Conjunction = 'AND' | 'OR';
export interface SegmentCondition { id: string; field: FilterField; operator: FilterOperator; value: string }
export interface SegmentConditionGroup { id: string; conjunction: Conjunction; conditions: SegmentCondition[] }
export interface SegmentDefinition { conjunction: Conjunction; groups: SegmentConditionGroup[] }
