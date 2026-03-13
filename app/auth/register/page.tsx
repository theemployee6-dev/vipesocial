/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// React e hooks
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Ícones
import {
  AtIcon,
  CalendarIcon,
  CaretDownIcon,
  EnvelopeIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";

// Componentes
import GlowBackground from "@/shared/ui/GlowBackground";
import NeonAccentLine from "./components/ui/TopAccentLine";
import Header from "./components/Header/Header";
import SectionDivider from "./components/ui/SectionDivider";
import FieldInput from "./components/Field/Field";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import AccountTypePicker from "./components/AccountTypePicker/AccountTypePicker";
import TermsCheckbox from "./components/TermsCheckbox/TermsCheckbox";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import LoginPrompt from "./components/LoginPrompt/LoginPrompt";

// Constantes e utilitários
import { fieldInputGeneroSelectOptions } from "./components/Field/constants/fieldInputGeneroSelectOptions";
import { socialMedias } from "./schemas/constants/socialStringAndIcons";
import { labelClass } from "./styles/formClasses";

// Schemas e tipos
import { RegisterFormData, registerSchema } from "./schemas/registerSchema";
import { brazilianStatesOptions } from "./utils/brazilianStatesOptions";
import { registerAction } from "./actions/registerAction";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [uploadKey, setUploadKey] = useState<number>(0);

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
      agreedToTerms: false as unknown as true,
      socialMedias: { instagram: "", tiktok: "", youtube: "" },
      avatar: null,
    },
  });

  const accountType = useWatch({ control, name: "accountType" });
  const agreed = useWatch({ control, name: "agreedToTerms" });
  const avatarFile = useWatch({ control, name: "avatar" });

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

    const { confirmPassword: _confirmPassword, ...rest } = data;

    const age: number = calculateAge(data.birthDate);

    const result = await registerAction({ ...rest, age });

    if (result.error) {
      console.error("Error: ", result.error);
      // mostrar toast de error
    } else {
      reset();
      setUploadKey((prev) => prev + 1);
      // redirecionar para o dashboard
    }

    setLoading(false);
  };

  return (
    <main className="relative w-screen h-screen bg-[#020617] p-5 sm:px-[5%] md:px-[10%] lg:px-[15%] xl:px-[18%] 2xl:px-[22%] 4k:px-[25%] overflow-x-hidden">
      <GlowBackground />
      <div className="w-full h-auto">
        {/* Linha neon superior */}
        <section className="pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-5 md:pb-5 lg:pt-6 lg:pb-6 xl:pt-7 xl:pb-7 2xl:pt-8 2xl:pb-8 4k:pt-10 4k:pb-10">
          <NeonAccentLine />
        </section>

        {/* Header */}
        <section className="fade-up delay-1">
          <Header
            firstSmallTitle="Nova Conta"
            secondBigTitleWhite="Comece a "
            secondBigTitleGreen="Viralizar"
            subTitle="Preencha dos dados abaixo para criar sua conta."
          />
        </section>

        {/* Divisor: Informações pessoais */}
        <section className="pt-0 sm:pt-2 md:pt-3 lg:pt-4 xl:pt-5 2xl:pt-6 4k:pt-7">
          <SectionDivider title="Informações pessoais" />
        </section>

        {/* Formulário */}
        <section>
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
              />
              <FieldInput
                label="Nome de usuário"
                type="text"
                placeholder="username"
                icon={<AtIcon size={20} />}
                registration={register("username")}
                error={errors.username?.message}
              />
            </section>

            {/* Nascimento e Email */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 fade-up delay-3">
              <FieldInput
                label="E-Mail"
                type="email"
                placeholder="seu@email.com"
                icon={<EnvelopeIcon size={18} />}
                registration={register("email")}
                error={errors.email?.message}
              />

              <FieldInput
                label="Data de nascimento"
                type="date"
                icon={<CalendarIcon size={20} />}
                iconPosition="right"
                placeholder="dd/mm/aa"
                registration={register("birthDate")}
                error={errors.birthDate?.message}
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
              />
              <FieldInput
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
                registration={register("confirmPassword")}
                error={errors.confirmPassword?.message}
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
                />
                <FieldInput
                  label="UF"
                  type="select"
                  options={brazilianStatesOptions}
                  registration={register("uf")}
                  error={errors.uf?.message}
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
              />
              <FieldInput
                label="Contato (opcional)"
                type="tel"
                placeholder="+55 (11) 99999-9999"
                icon={<PhoneIcon size={20} />}
                registration={register("phone")}
                error={errors.phone?.message}
              />
            </section>

            {/* Divisor: Perfil público */}
            <section className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-8 4k:pt-10">
              <SectionDivider title="Perfil público" />
            </section>

            {/* Foto de perfil + Bio */}
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 4k:gap-10 fade-up delay-7">
              <div className="shrink-0 w-full sm:w-auto">
                <ImageUpload
                  key={uploadKey}
                  onChange={(file) => setValue("avatar", file)}
                  error={errors.avatar?.message}
                />
              </div>
              <section className="flex-1 fade-up delay-8">
                <FieldInput
                  label="Biografia"
                  type="textarea"
                  placeholder="Conte um pouco sobre você, seu conteúdo e nicho..."
                  registration={register("bio")}
                  error={errors.bio?.message}
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
              />
            </section>

            {/* Termos */}
            <section className="flex flex-col items-start gap-1 fade-up delay-12">
              <div className="flex items-start gap-3 cursor-pointer group">
                <TermsCheckbox
                  value={agreed}
                  onChange={(val) =>
                    setValue("agreedToTerms", val as unknown as true, {
                      shouldValidate: true,
                    })
                  }
                />
              </div>
              {errors.agreedToTerms && (
                <p className="text-sm text-red-400">
                  {errors.agreedToTerms.message}
                </p>
              )}
            </section>

            {/* Botão de submit e link login */}
            <div className="relative flex flex-col items-center fade-up delay-13">
              <section className="w-full lg:w-[70%] xl:w-[65%] 2xl:w-[60%] 4k:w-[50%]">
                <SubmitButton
                  title="Criar conta"
                  size="full"
                  loading={loading}
                />
              </section>

              {/* Login Prompt */}
              <section className="fade-up delay-14">
                <LoginPrompt href="/auth/login" linkText="Entrar agora" />
              </section>
            </div>
          </form>
        </section>

        {/* Linha neon inferior */}
        <section className="pt-5 pb-5 sm:pt-6 sm:pb-6 md:pt-7 md:pb-7 lg:pt-8 lg:pb-8 xl:pt-9 xl:pb-9 2xl:pt-10 2xl:pb-10 4k:pt-12 4k:pb-12">
          <NeonAccentLine />
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
