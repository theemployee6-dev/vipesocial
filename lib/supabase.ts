/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";

// Força a Vercel a não tentar gerar esta rota de forma estática no build
export const dynamic = "force-dynamic";

// Pegamos as chaves que você guardou no arquivo secreto .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// O cliente só será instanciado se as strings não estiverem vazias
// Isso impede o erro "supabaseUrl is required" durante o build
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);

/* 
   Este arquivo é como se fosse o "Cabo de Rede". Ele pega a URL e a Chave 
   para garantir que toda vez que o site quiser falar com o banco, 
   ele já saiba o caminho e tenha a autorização.
*/
