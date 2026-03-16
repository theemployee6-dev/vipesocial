import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import { redirect } from "next/navigation";
import { routesString } from "@/shared/constants/routesString";

interface GetAuthenticatedUserOptions {
  id: string;
  redirectTo?: string;
}

export const getAuthenticatedUser = cache(
  async ({ id, redirectTo }: GetAuthenticatedUserOptions) => {
    try {
      const supabase = await createServerSupabaseClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Erro de autenticação:", error?.message);
        redirect(routesString.auth.login);
      }

      if (user.id !== id) {
        // Se não foi passado redirectTo, usa um padrão baseado no contexto
        const fallbackRedirect =
          redirectTo || `${routesString.dashboard}${user.id}`;
        redirect(fallbackRedirect);
      }

      return { user, supabase };
    } catch (error) {
      console.error("Erro inesperado em getAuthenticatedUser:", error);
      redirect(routesString.auth.login); // ou para uma página de erro
    }
  },
);
