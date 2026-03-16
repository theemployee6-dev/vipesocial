import { getAuthenticatedUser } from "@/lib/util/auth/auth";
import { getProfile } from "@/lib/util/profile/profile";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Autentica e valida o ID
  const { user } = await getAuthenticatedUser({
    id,
    redirectTo: `/dashboard/${id}/profile`, // se o ID não bater, redireciona para o perfil do usuário
  });

  // 2. Busca os dados do perfil (usando o ID do usuário, que já garantimos ser o mesmo)
  const profile = await getProfile(user.id);
  const socialMedias = Object.entries(profile.social_medias);
  return (
    <main className="w-screen h-screen overflow-x-hidden">
      <section className="bg-emerald-500 w-full h-auto px-5 py-3 border-3 border-red-500 flex flex-col gap-2 wrap-break-word">
        <h1 className="text-[36px]">Olá, {profile.full_name}</h1>
        <hr />
        <h2>idade: {profile.age}</h2>
        <h3>data de aniversário: {profile.birth_date}</h3>
        <h4>email: {profile.email}</h4>
        <h5>Gênero: {profile.gender}</h5>
        <h6>Telefone: {profile.phone}</h6>
        <span>cidade: {profile.city}</span>
        <span>uf: {profile.uf}</span>
        <span>País: {profile.country}</span>
        <span>Bio: {profile.bio}</span>
        <span>Interesses: {profile.interests}</span>
        <span>Tipo de Conta: {profile.account_type}</span>
        <span>
          Concorda com os Termos?:{" "}
          {String(profile.agreed_to_terms).includes("true") ? "sim" : "não"}
        </span>
        <span>
          <h3>Redes Sociais</h3>
          {profile.social_medias && (
            <ul>
              {socialMedias.map(([rede, usuario]) => (
                <li key={rede}>
                  <strong>{rede}:</strong> {String(usuario)}
                </li>
              ))}
            </ul>
          )}
        </span>
      </section>
    </main>
  );
}
