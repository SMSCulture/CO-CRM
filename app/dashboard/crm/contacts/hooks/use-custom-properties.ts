"use client";

import { useMemo } from "react";

export type CustomPropertyType = "text" | "number" | "date" | "checkbox" | "dropdown";

export interface CustomPropertyDef {
  key: string;
  label: string;
  type: CustomPropertyType;
  options?: string[];
}

const CUSTOM_PROPERTY_DEFS: CustomPropertyDef[] = [
  { key: "seatingPreference", label: "Seating Preference", type: "dropdown", options: ["Orchestra", "Balcony", "No preference"] },
  { key: "wheelchairAccess", label: "Wheelchair Access Needed", type: "checkbox" },
  { key: "referralSource", label: "Referral Source", type: "text" },
  { key: "anniversaryDate", label: "Anniversary Date", type: "date" },
  { key: "partySize", label: "Typical Party Size", type: "number" },
];

// Mock property definitions colocated with contacts — data-properties itself
// is still a stub module, so this stands in until a real property schema exists.
const MOCK_VALUES: Record<string, Record<string, string | number | boolean>> = {
  "1": { seatingPreference: "Orchestra", wheelchairAccess: false, referralSource: "Friend referral", partySize: 4 },
  "4": { seatingPreference: "Balcony", wheelchairAccess: false, referralSource: "Board member", partySize: 2 },
};

export function useCustomProperties(contactId: string) {
  const values = useMemo(() => MOCK_VALUES[contactId] ?? {}, [contactId]);
  return { definitions: CUSTOM_PROPERTY_DEFS, values, isLoading: false };
}
