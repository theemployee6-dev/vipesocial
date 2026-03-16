import { getAuthenticatedUser } from "@/lib/util/auth/auth";

import ProfileBtn from "../components/ProfileBtn";
import Layout from "../layout";
import HeaderText from "../components/HeaderText";
import { routesString } from "@/shared/constants/routesString";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ⬇️ Aguarda a Promise de
  const { id } = await params;

  const { user } = await getAuthenticatedUser({
    id,
    // Se o ID não corresponder, redireciona para o dashboard do próprio usuário
    redirectTo: `${routesString.dashboard}/${id}`, // note: ainda usa o id da URL, mas será substituído pelo user.id dentro da função
  });

  return (
    <Layout>
      <HeaderText />
      <ProfileBtn userId={user.id} />
    </Layout>
  );
}
