import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { routesString } from "./shared/constants/routesString";

export async function proxy(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Recarrega a sessão (refresh se necessário) e obtém o usuário
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se não houver usuário e a rota for protegida, redireciona para login
  if (!user && request.nextUrl.pathname.startsWith(routesString.dashboard)) {
    const redirectUrl = new URL(routesString.auth.login, request.url);

    // Opcional: salvar a URL original para redirecionar após login
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Protege todas as rotas que começam com /dashboard
     * Ajuste conforme necessário (ex: '/profile/:path*')
     */

    "/dashboard/:path*",
  ],
};
