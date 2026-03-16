import ResultadoAnalise from "@/components/ResultadoAnalise/ResultadoAnalise";
import { getAnaliseById } from "@/lib/queries/analisesTable/analisesById";
import { getAuthenticatedUser } from "@/lib/util/auth/auth";
import { notFound } from "next/navigation";

export default async function AnalisePage({
  params,
}: {
  params: Promise<{ id: string; analiseId: string }>;
}) {
  const { id, analiseId } = await params;

  // Verifica autenticação e se o usuário é dono da rota
  const { user } = await getAuthenticatedUser({ id });

  // Busca a análise específica (deve verificar se pertence a este user)
  const analise = await getAnaliseById(analiseId, user.id);

  if (!analise) {
    notFound();
  }

  return <ResultadoAnalise resultado={analise.resultado_completo!} />;
}
