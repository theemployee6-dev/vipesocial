/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Logo from "@/shared/ui/Logo";
import Image from "next/image";
import { useState } from "react";

const inputClass = `
  w-full px-4 py-3 rounded-xl
  bg-[#1e293b] border border-slate-700
  text-white text-sm placeholder-slate-500
  focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20
  transition-all duration-200
`;

const selectClass = `
  w-full px-4 py-3 rounded-xl
  bg-[#1e293b] border border-slate-700
  text-slate-400 text-sm
  focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20
  transition-all duration-200 appearance-none cursor-pointer
`;

const labelClass =
  "text-slate-400 text-[11px] font-semibold tracking-[0.15em] uppercase mb-1.5 block";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, .syne { font-family: 'Syne', sans-serif; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #10b981; }

        .radio-card input[type="radio"]:checked ~ .card-face {
          border-color: #10b981;
          background: #10b9810d;
          color: #10b981;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .delay-1 { animation-delay: 0.05s; opacity: 0; }
        .delay-2 { animation-delay: 0.10s; opacity: 0; }
        .delay-3 { animation-delay: 0.15s; opacity: 0; }
        .delay-4 { animation-delay: 0.20s; opacity: 0; }
        .delay-5 { animation-delay: 0.25s; opacity: 0; }
        .delay-6 { animation-delay: 0.30s; opacity: 0; }
        .delay-7 { animation-delay: 0.35s; opacity: 0; }
        .delay-8 { animation-delay: 0.40s; opacity: 0; }
        .delay-9 { animation-delay: 0.45s; opacity: 0; }
        .delay-10 { animation-delay: 0.50s; opacity: 0; }
        .delay-11 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-10 relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute w-[700] h-[700] bg-emerald-500/20 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200] h-[600] bg-emerald-400/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Card */}
        <div className="relative w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-emerald-400/20 shadow-2xl">
          {/* Top accent line */}
          <div className="h-[2] w-full bg-linear-to-r from-transparent via-emerald-400 to-transparent opacity-60" />

          <div className="px-8 pt-8 pb-10">
            {/* Header */}
            <div className="text-center mb-8 fade-up">
              <div className="inline-flex items-center gap-2 mb-4">
                {" "}
                <Logo />
              </div>

              <div className="space-y-1">
                <p className="text-emerald-400 text-[11px] font-semibold tracking-[0.2em] uppercase">
                  Nova conta
                </p>
                <h1 className="syne text-white text-2xl font-bold">
                  Comece a <span className="text-emerald-400">viralizar.</span>
                </h1>
                <p className="text-slate-400 text-sm">
                  Preencha os dados abaixo para criar sua conta.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-7 fade-up delay-1">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                Informações pessoais
              </span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 6l-10 7L2 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M7 11V7a5 5 0 0110 0v4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12l2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M7 11V7a5 5 0 0110 0v4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
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
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Field>
              </div>

              {/* País + Telefone */}
              <div className="grid grid-cols-2 gap-4 fade-up delay-5">
                <Field label="País / Localização">
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      className={inputClass + " pl-9"}
                      placeholder="+55 (11) 99999-9999"
                    />
                  </div>
                </Field>
              </div>

              {/* Section divider */}
              <div className="flex items-center gap-3 pt-2 fade-up delay-6">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                  Perfil público
                </span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

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
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-slate-500 group-hover:text-emerald-400/60 transition-colors"
                        >
                          <path
                            d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                  {[
                    {
                      label: "Instagram",
                      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                    },
                    {
                      label: "TikTok",
                      icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
                    },
                    {
                      label: "YouTube",
                      icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                    },
                  ].map(({ label, icon }) => (
                    <div key={label} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={icon} />
                        </svg>
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      className={inputClass + " pl-9"}
                      placeholder="ex: tecnologia, humor, lifestyle, finanças..."
                    />
                  </div>
                </Field>
              </div>

              {/* Section divider */}
              <div className="flex items-center gap-3 pt-2 fade-up delay-8">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                  Tipo de conta
                </span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              {/* Tipo de conta */}
              <div className="grid grid-cols-3 gap-3 fade-up delay-9">
                {[
                  {
                    value: "pessoal",
                    label: "Pessoal",
                    desc: "Uso próprio",
                    icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
                  },
                  {
                    value: "criador",
                    label: "Criador",
                    desc: "Produtor de conteúdo",
                    icon: "M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
                  },
                  {
                    value: "marca",
                    label: "Marca",
                    desc: "Empresa / negócio",
                    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z M9 22V12h6v10",
                  },
                ].map(({ value, label, desc, icon }) => (
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`mb-2 ${accountType === value ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      <path
                        d={icon}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      className={`text-sm font-semibold ${accountType === value ? "text-emerald-400" : "text-white"}`}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                    {accountType === value && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="#020617"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                      <svg
                        className="w-full h-full p-0.5"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#020617"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Criando conta...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 syne tracking-wide">
                      Criar conta
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-center text-sm text-slate-400 mt-5">
                  Já tem uma conta?{" "}
                  <span className="text-emerald-400 font-semibold hover:underline cursor-pointer">
                    Entrar agora
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
