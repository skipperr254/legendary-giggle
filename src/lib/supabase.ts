import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Key must be defined in environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
