import { getUserAnalises } from "@/lib/queries/analisesTable/userAnalises";
import { getAuthenticatedUser } from "@/lib/util/auth/auth";
import Link from "next/link";

export default async function HistoricoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await getAuthenticatedUser({ id });
  const analises = await getUserAnalises(user.id); // array de análises

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Histórico de Análises</h1>
      {analises.length === 0 ? (
        <p>Nenhuma análise encontrada.</p>
      ) : (
        <div className="grid gap-4">
          {analises.map((analise) => (
            <Link
              key={analise.id}
              href={`/dashboard/${user.id}/historico/${analise.id}`}
              className="block p-4 border rounded hover:bg-slate-800 transition"
            >
              <p className="text-sm text-slate-400">
                {new Date(analise.criado_em).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                {analise.nicho || "Nicho não informado"}
              </p>
              <p className="text-sm text-slate-300">{analise.emocao_central}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
