"use client";

import { useState } from "react";
import GlowBackground from "@/shared/ui/GlowBackground";
import NeonAccentLine from "./components/ui/TopAccentLine";
import Header from "./components/Header/Header";
import SectionDivider from "./components/ui/SectionDivider";

import {
  AtIcon,
  CalendarIcon,
  CaretDownIcon,
  EnvelopeIcon,
  HashIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import FieldInput from "./components/Field/Field";
import { fieldInputGeneroSelectOptions } from "./components/Field/constants/fieldInputGeneroSelectOptions";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import { socialMedias } from "./utils/socialStringAndIcons";
import { labelClass } from "./styles/formClasses";
import AccountTypePicker from "./components/AccountTypePicker/AccountTypePicker";
import TermsCheckbox from "./components/TermsCheckbox/TermsCheckbox";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import LoginPrompt from "./components/LoginPrompt/LoginPrompt";

const RegisterPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(avatar);
    setTimeout(() => setLoading(false), 2000);
  };

  const [accountType, setAccountType] = useState("pessoal");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

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
        <section className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-8 4k:pt-10">
          <SectionDivider title="Informações pessoais" />
        </section>

        {/* Formulário */}
        <section>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-9 4k:space-y-10"
          >
            {/* Nome + Username */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-2">
              <FieldInput
                label="Nome Completo"
                type="text"
                placeholder="João Silva"
                icon={<UserIcon size={20} />}
              />
              <FieldInput
                label="Nome de usuário"
                type="text"
                placeholder="username"
                icon={<AtIcon size={20} />}
              />
            </section>

            {/* Idade + Cidade */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 fade-up delay-3">
              <FieldInput
                label="Idade"
                type="number"
                placeholder="18"
                icon={<HashIcon size={20} />}
              />
              <FieldInput
                label="Cidade"
                type="text"
                placeholder="São Paulo"
                icon={<MapPinIcon size={20} />}
              />
            </section>

            {/* Email */}
            <section className="fade-up delay-4">
              <FieldInput
                label="E-Mail"
                type="email"
                placeholder="seu@email.com"
                icon={<EnvelopeIcon size={18} />}
              />
            </section>

            {/* Senha e Confirmar Senha */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-5">
              <FieldInput
                label="Senha"
                type="password"
                placeholder="••••••••"
              />
              <FieldInput
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
              />
            </section>

            {/* Nascimento + Gênero */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-6">
              <FieldInput
                label="Data de nascimento"
                type="date"
                icon={<CalendarIcon size={20} />}
                iconPosition="right"
                placeholder="dd/mm/aa"
              />
              <FieldInput
                label="Gênero"
                type="select"
                icon={<CaretDownIcon size={20} />}
                iconPosition="right"
                options={fieldInputGeneroSelectOptions}
              />
            </section>

            {/* País + Contato */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 4k:gap-10 fade-up delay-7">
              <FieldInput
                label="País / Localização"
                type="text"
                placeholder="Brasil"
                icon={<MapPinIcon size={20} />}
              />
              <FieldInput
                label="Contato"
                type="tel"
                placeholder="+55 (11) 99999-9999"
                icon={<PhoneIcon size={20} />}
              />
            </section>

            {/* Divisor: Perfil público */}
            <section className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-8 4k:pt-10">
              <SectionDivider title="Perfil público" />
            </section>

            {/* Foto de perfil + Bio */}
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 4k:gap-10 fade-up delay-8">
              <div className="shrink-0 w-full sm:w-auto">
                <ImageUpload onChange={(file) => setAvatar(file)} />
              </div>
              <section className="flex-1 fade-up delay-8">
                <FieldInput
                  label="Biografia"
                  type="textarea"
                  placeholder="Conte um pouco sobre você, seu conteúdo e nicho..."
                />
              </section>
            </section>

            {/* Redes Sociais */}
            <section className="fade-up delay-9">
              <label className={labelClass}>Redes sociais</label>
              <section className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 4k:gap-8">
                {socialMedias.map(({ label, icon: Icon }) => (
                  <FieldInput
                    key={label}
                    icon={<Icon size={13} weight="fill" />}
                    placeholder={label}
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
                onChange={setAccountType}
              />
            </section>

            {/* Termos */}
            <section className="flex items-start gap-3 cursor-pointer group fade-up delay-12">
              <TermsCheckbox value={agreed} onChange={setAgreed} />
            </section>

            {/* Botão de submit e link login */}
            <div className="relative flex flex-col items-center fade-up delay-14">
              <section className="w-full lg:w-[70%] xl:w-[65%] 2xl:w-[60%] 4k:w-[50%]">
                <SubmitButton title="Criar conta" size="full" />
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
