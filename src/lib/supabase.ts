import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anon);

export const supabase = supabaseConfigured
  ? createClient(url!, anon!)
  : (null as unknown as ReturnType<typeof createClient>);

export type BookingStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "completed"
  | "cancelled";

export type BookingRequest = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  preferred_times: string;
  topic: string;
  status: BookingStatus;
  paid: boolean;
  session_link: string | null;
  admin_notes: string | null;
};
