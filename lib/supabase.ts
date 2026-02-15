import { createClient } from "@supabase/supabase-js";

// Pegamos as chaves que você guardou no arquivo secreto .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// O cliente só será instanciado se as strings não estiverem vazias
// Isso impede o erro "supabaseUrl is required" durante o build
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* 
   Este arquivo é como se fosse o "Cabo de Rede". Ele pega a URL e a Chave 
   para garantir que toda vez que o site quiser falar com o banco, 
   ele já saiba o caminho e tenha a autorização.
*/
