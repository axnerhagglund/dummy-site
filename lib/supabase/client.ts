import { createClient } from "@supabase/supabase-js";

// Hämta environment variables
// Om de saknas kastar vi ett tydligt fel så att det är lätt att hitta misstaget
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Skapa och exportera Supabase-klienten
// createClient skapar en anslutning till din Supabase-databas med hjälp av URL och den publika "anon"-nyckeln.
// Detta är säkert för frontend-läsning så länge dina Row Level Security (RLS) policies är korrekta.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
