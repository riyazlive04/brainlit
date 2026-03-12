import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Registration {
  // `id` column is the primary key; in some schemas it's a UUID string.
  // Keep it typed flexibly so we can display and use it.
  id?: number | string;
  parent_name: string;
  whatsapp: string;
  email: string;
  location: string;
  registered_at: string;
  webinar_date?: string; // new field for which webinar this lead signed up for (nullable for existing records)
  meeting_link?: string;
  created_at?: string;
}

export interface WebinarSettings {
  id?: number;
  next_webinar_date: string;
  meeting_link?: string; // URL for the webinar
  updated_at?: string;
}
