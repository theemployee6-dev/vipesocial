import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRole) {
  throw new Error("Missing Supabase admin Enviroment variables.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);
