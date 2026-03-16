import { getAuthenticatedUser } from "@/lib/util/auth/auth";
import { getUserAnalises } from "@/lib/queries/analisesTable/analises";
import HistoricoClient from "./components/HistoricoClientPage/page";

export default async function HistoricoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { user } = await getAuthenticatedUser({ id });

  // 2. Busca as análises desse usuário
  const analises = await getUserAnalises(user.id);

  return <HistoricoClient analises={analises} />;
}
