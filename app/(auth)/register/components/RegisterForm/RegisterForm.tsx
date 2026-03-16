"use client";

// 1. React e Next
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. React Hook Form
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 3. Ícones
import {
  UserIcon,
  AtIcon,
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  CaretDownIcon,
  PhoneIcon,
  HeartIcon,
} from "@phosphor-icons/react";

// 4. Componentes locais
import AccountTypePicker from "../AccountTypePicker/AccountTypePicker";
import FieldInput from "../Field/Field";
import ImageUpload from "../ImageUpload/ImageUpload";
import LoginPrompt from "../LoginPrompt/LoginPrompt";
import SubmitButton from "../SubmitButton/SubmitButton";
import TermsCheckbox from "../TermsCheckbox/TermsCheckbox";
import SectionDivider from "../ui/SectionDivider";

// 5. Constantes e utilitários
import { socialMedias } from "../../schemas/constants/socialStringAndIcons";
import { labelClass } from "../../styles/formClasses";
import { brazilianStatesOptions } from "../../utils/brazilianStatesOptions";
import { fieldInputGeneroSelectOptions } from "../Field/constants/fieldInputGeneroSelectOptions";

// 6. Tipos e schemas
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema";

// 7. Ações
import { registerAction } from "../../actions/registerAction";
import { routesString } from "../../../../../shared/constants/routesString";
import GlowBackground from "@/shared/ui/GlowBackground";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [uploadKey, setUploadKey] = useState<number>(0);

  const router = useRouter();

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: "pessoal",
      agreedToTerms: false,
      socialMedias: { instagram: "", tiktok: "", youtube: "" },
      avatar: null,
    },
  });

  const accountType = useWatch({ control, name: "accountType" });
  const agreed = useWatch({ control, name: "agreedToTerms" });

  //calcular idade pelo ano
  function calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _confirmPassword, ...rest } = data;
      const age = calculateAge(data.birthDate);
      const result = await registerAction({ ...rest, age });

      if ("success" in result) {
        reset();
        setUploadKey((prev) => prev + 1);
        // redirecionar
        router.replace(`${routesString.dashboard}/${result.userId}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`Ocorreu um erro: ${error.message}. Tente novamente.`);
      console.error("Exceção na chamada da action:", error.message);
      // mostrar toast de erro genérico
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-9 4k:space-y-10"
      >
        {/* Nome + Username */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-2">
          <FieldInput
            label="Nome Completo"
            type="text"
            placeholder="João Silva"
            icon={<UserIcon size={20} />}
            registration={register("fullName")}
            error={errors.fullName?.message}
            disabled={loading}
          />
          <FieldInput
            label="Nome de usuário"
            type="text"
            placeholder="username"
            icon={<AtIcon size={20} />}
            registration={register("username")}
            error={errors.username?.message}
            disabled={loading}
          />
        </section>

        {/* Nascimento e Email */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 fade-up delay-3">
          <FieldInput
            label="E-Mail"
            type="email"
            placeholder="seu@email.com"
            icon={<EnvelopeIcon size={20} />}
            registration={register("email")}
            error={errors.email?.message}
            disabled={loading}
          />

          <FieldInput
            label="Data de nascimento"
            type="date"
            icon={<CalendarIcon size={20} />}
            iconPosition="right"
            placeholder="dd/mm/aa"
            registration={register("birthDate")}
            error={errors.birthDate?.message}
            disabled={loading}
          />
        </section>

        {/* Senha e Confirmar Senha */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-4">
          <FieldInput
            label="Senha"
            type="password"
            placeholder="••••••••"
            registration={register("password")}
            error={errors.password?.message}
            disabled={loading}
          />
          <FieldInput
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={loading}
          />
        </section>

        {/* Cidade + UF + Gênero */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 fade-up delay-5">
          {/* Cidade + UF — sempre juntos */}
          <div className="grid grid-cols-[1fr_80px] sm:grid-cols-[1fr_90px] lg:grid-cols-[1fr_100px] gap-2 sm:gap-3">
            <FieldInput
              label="Cidade"
              type="text"
              placeholder="Ex: São Paulo"
              icon={<MapPinIcon size={20} />}
              registration={register("city")}
              error={errors.city?.message}
              disabled={loading}
            />
            <FieldInput
              label="UF"
              type="select"
              options={brazilianStatesOptions}
              registration={register("uf")}
              error={errors.uf?.message}
              disabled={loading}
            />
          </div>

          {/* Gênero — ao lado no desktop, abaixo no mobile */}
          <FieldInput
            label="Gênero"
            type="select"
            icon={<CaretDownIcon size={20} />}
            iconPosition="right"
            options={fieldInputGeneroSelectOptions}
            registration={register("gender")}
            error={errors.gender?.message}
            disabled={loading}
          />
        </section>

        {/* País + Contato */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-6">
          <FieldInput
            label="País / Localização"
            type="text"
            placeholder="Brasil"
            icon={<MapPinIcon size={20} />}
            registration={register("country")}
            error={errors.country?.message}
            disabled={loading}
          />
          <FieldInput
            label="Contato (opcional)"
            type="tel"
            placeholder="+55 (11) 99999-9999"
            icon={<PhoneIcon size={20} />}
            registration={register("phone")}
            error={errors.phone?.message}
            disabled={loading}
          />
        </section>

        {/* Divisor: Perfil público */}
        <section className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-8 4k:pt-10">
          <SectionDivider title="Perfil público" />
        </section>

        {/* Foto de perfil + Bio */}
        <section className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 4k:gap-10 fade-up delay-7">
          <GlowBackground />
          <div className="shrink-0 w-full sm:w-auto">
            <ImageUpload
              key={uploadKey}
              onChange={(file) => setValue("avatar", file)}
              error={errors.avatar?.message}
              disabled={loading}
            />
          </div>
          <section className="flex-1 fade-up delay-8">
            <FieldInput
              label="Biografia"
              type="textarea"
              placeholder="Conte um pouco sobre você, seu conteúdo e nicho..."
              registration={register("bio")}
              error={errors.bio?.message}
              disabled={loading}
            />
          </section>
        </section>

        {/* Redes Sociais */}
        <section className="fade-up delay-9">
          <label className={labelClass}>Redes sociais (opcional)</label>
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 4k:gap-8">
            {socialMedias.map(({ name, label, icon: Icon }) => (
              <FieldInput
                key={name}
                icon={<Icon size={13} weight="fill" />}
                placeholder={label}
                registration={register(`socialMedias.${name}`)}
                error={errors.socialMedias?.[name]?.message}
                disabled={loading}
              />
            ))}
          </section>
        </section>

        {/* Interesses */}
        <section className="fade-up delay-10">
          <FieldInput
            label="Interesses / Categorias"
            placeholder="ex: tecnologia, humor, lifestyle, finanças..."
            icon={<HeartIcon size={20} />}
            registration={register("interests")}
            error={errors.interests?.message}
            disabled={loading}
          />
        </section>

        {/* Divisor: Tipo de conta */}
        <section className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-8 4k:pt-10">
          <SectionDivider title="Tipo de conta" />
        </section>

        {/* Tipo de conta */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-11">
          <AccountTypePicker
            value={accountType}
            onChange={(val) => setValue("accountType", val)}
            disabled={loading}
          />
        </section>

        {/* Termos */}
        <section className="flex flex-col items-start gap-1 fade-up delay-12">
          <TermsCheckbox
            value={agreed}
            onChange={(val) => setValue("agreedToTerms", val)}
            disabled={loading}
            error={errors.agreedToTerms?.message}
          />
        </section>

        {/* Botão de submit e link login */}
        <div className="relative flex flex-col items-center fade-up delay-13">
          <section className="w-full lg:w-[70%] xl:w-[65%] 2xl:w-[60%] 4k:w-[50%]">
            <SubmitButton title="Criar conta" size="full" loading={loading} />
          </section>

          {/* Login Prompt */}
          <section className="fade-up delay-14">
            <LoginPrompt />
          </section>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
