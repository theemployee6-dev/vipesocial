/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header/Header";
import {
  EnvelopeIcon,
  LockIcon,
  CaretDownIcon,
  MapPinIcon,
  PhoneIcon,
  UploadIcon,
  HeartIcon,
  CheckIcon,
  CircleNotchIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { inputClass, labelClass, selectClass } from "./styles/formClasses";
import { socialMedias } from "./utils/socialStringAndIcons";
import SectionDivider from "./components/ui/SectionDivider";
import { accountTypeStringAndIcons } from "./utils/accountTypeStringAndIcons";
import GlowBackground from "../../../shared/ui/GlowBackground";
import Link from "next/link";
import TopAccentLine from "./components/ui/TopAccentLine";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function RegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [accountType, setAccountType] = useState("pessoal");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Glow background */}
      <GlowBackground />
      {/* Wrapper */}
      <div className="relative w-full max-w-2xl">
        {/* Top accent line */}
        <TopAccentLine />

        <div className="px-8 pt-8 pb-10">
          {/* Header */}
          <Header
            firstSmallTitle="Nova Conta"
            secondBigTitleWhite="Comece a "
            secondBigTitleGreen="Viralizar"
            subTitle="Preencha dos dados abaixo para criar sua conta."
          />

          {/* Divider */}
          <SectionDivider title="Informações pessoais" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome + Username */}
            <div className="grid grid-cols-2 gap-4 fade-up delay-2">
              <Field label="Nome completo">
                <input className={inputClass} placeholder="João Silva" />
              </Field>
              <Field label="Nome de usuário">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    @
                  </span>
                  <input
                    className={inputClass + " pl-7"}
                    placeholder="joaosilva"
                  />
                </div>
              </Field>
            </div>

            {/* Email */}
            <div className="fade-up delay-3">
              <Field label="E-mail">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {/* email icon svg */}
                    <EnvelopeIcon
                      size={18}
                      color="currentColor"
                      weight="regular"
                    />
                  </div>
                  <input
                    className={inputClass + " pl-9"}
                    placeholder="seu@email.com"
                    type="email"
                  />
                </div>
              </Field>
            </div>

            {/* Senha */}
            <div className="grid grid-cols-2 gap-4 fade-up delay-4">
              <Field label="Senha">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {/* password icon */}
                    <LockIcon size={18} color="currentColor" weight="regular" />
                  </div>
                  <input
                    type="password"
                    className={inputClass + " pl-9"}
                    placeholder="••••••••"
                  />
                </div>
              </Field>
              <Field label="Confirmar senha">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {/* confimation icon */}
                    <LockIcon size={18} color="currentColor" weight="regular" />
                  </div>
                  <input
                    type="password"
                    className={inputClass + " pl-9"}
                    placeholder="••••••••"
                  />
                </div>
              </Field>
            </div>

            {/* Nascimento + Gênero */}
            <div className="grid grid-cols-2 gap-4 fade-up delay-5">
              <Field label="Data de nascimento">
                <input type="date" className={inputClass} />
              </Field>
              <Field label="Gênero">
                <div className="relative">
                  <select className={selectClass}>
                    <option value="">Opcional</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <CaretDownIcon
                      size={18}
                      color="currentColor"
                      weight="regular"
                    />
                  </div>
                </div>
              </Field>
            </div>

            {/* País + Telefone */}
            <div className="grid grid-cols-2 gap-4 fade-up delay-5">
              <Field label="País / Localização">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {/* map pin icon */}
                    <MapPinIcon
                      size={18}
                      color="currentColor"
                      weight="regular"
                    />
                  </div>
                  <input
                    className={inputClass + " pl-9"}
                    placeholder="Brasil"
                  />
                </div>
              </Field>
              <Field label="Telefone (opcional)">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {/* telephone icon */}
                    <PhoneIcon
                      size={18}
                      color="currentColor"
                      weight="regular"
                    />
                  </div>
                  <input
                    className={inputClass + " pl-9"}
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>
              </Field>
            </div>

            {/* Section divider */}
            <SectionDivider title="Perfil público" />

            {/* Foto de perfil */}
            <div className="fade-up delay-6">
              <label className={labelClass}>Foto de perfil (opcional)</label>
              <div className="flex items-center gap-4">
                <label className="relative cursor-pointer group">
                  <div
                    className={`w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 group-hover:border-emerald-400/40 transition-colors flex items-center justify-center overflow-hidden ${preview ? "border-solid border-emerald-400/40" : ""}`}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <UploadIcon
                        size={18}
                        color="currentColor"
                        weight="regular"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="sr-only"
                  />
                </label>
                <div>
                  <p className="text-slate-400 text-xs">
                    Clique para enviar uma imagem
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    PNG, JPG ou WEBP · Máx. 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="fade-up delay-7">
              <Field label="Biografia">
                <textarea
                  className={inputClass + " h-24 resize-none leading-relaxed"}
                  placeholder="Conte um pouco sobre você, seu conteúdo e nicho..."
                />
              </Field>
            </div>

            {/* Redes Sociais */}
            <div className="fade-up delay-7">
              <label className={labelClass}>Redes sociais</label>
              <div className="grid grid-cols-3 gap-3">
                {socialMedias.map(({ label, icon: Icon }) => (
                  <div key={label} className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Icon size={13} weight="fill" />
                    </div>
                    <input
                      className={inputClass + " pl-8 text-xs"}
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Interesses */}
            <div className="fade-up delay-8">
              <Field label="Interesses / categorias">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <HeartIcon
                      size={14}
                      color="currentColor"
                      weight="regular"
                    />
                  </div>
                  <input
                    className={inputClass + " pl-9"}
                    placeholder="ex: tecnologia, humor, lifestyle, finanças..."
                  />
                </div>
              </Field>
            </div>

            {/* Section divider */}
            <SectionDivider title="Tipo de conta" />

            {/* Tipo de conta */}
            <div className="grid grid-cols-3 gap-3 fade-up delay-9">
              {accountTypeStringAndIcons.map(({ value, label, desc, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAccountType(value)}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                    accountType === value
                      ? "border-emerald-400 bg-emerald-400/5 shadow-sm shadow-emerald-400/10"
                      : "border-slate-700 bg-[#1e293b] hover:border-slate-500"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`mb-2 ${accountType === value ? "text-emerald-400" : "text-slate-500"}`}
                    weight="regular"
                  />
                  <p
                    className={`text-sm font-semibold ${accountType === value ? "text-emerald-400" : "text-white"}`}
                  >
                    {label}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                  {accountType === value && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                      <CheckIcon size={8} color="#020617" weight="bold" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Termos */}
            <label className="flex items-start gap-3 cursor-pointer group fade-up delay-10">
              <div
                className="relative mt-0.5 shrink-0"
                onClick={() => setAgreed(!agreed)}
              >
                <div
                  className={`w-5 h-5 rounded-md border transition-all ${
                    agreed
                      ? "bg-emerald-400 border-emerald-400"
                      : "bg-[#1e293b] border-slate-700 group-hover:border-slate-500"
                  }`}
                >
                  {agreed && (
                    <CheckIcon
                      weight="bold"
                      color="#020617"
                      className="w-full h-full p-0.5"
                    />
                  )}
                </div>
              </div>
              <span className="text-slate-400 text-sm leading-relaxed">
                Aceito os{" "}
                <span className="text-emerald-400 hover:underline cursor-pointer">
                  termos de uso
                </span>{" "}
                e{" "}
                <span className="text-emerald-400 hover:underline cursor-pointer">
                  política de privacidade
                </span>{" "}
                da VipeSocial.
              </span>
            </label>

            {/* Submit */}
            <div className="fade-up delay-11">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3.5 rounded-xl font-bold text-sm text-[#020617] overflow-hidden group transition-all duration-300 disabled:opacity-70 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <CircleNotchIcon
                      size={16}
                      className="animate-spin"
                      weight="bold"
                    />
                    Criando conta...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 Poppins tracking-wide">
                    Criar conta
                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                      color="currentColor"
                    />
                  </span>
                )}
              </button>

              <p className="text-center text-sm text-slate-400 mt-5">
                Já tem uma conta?{" "}
                <Link href={"/auth/login"}>
                  <span className="text-emerald-400 font-semibold hover:underline cursor-pointer">
                    Entrar agora
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
