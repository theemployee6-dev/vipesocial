"use client";

import GlowBackground from "../../../shared/ui/GlowBackground";
import Link from "next/link";
import Header from "../register/components/Header/Header";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Glow background responsivo */}
      <GlowBackground />

      {/* Card responsivo */}
      <div className="relative w-full max-w-[90%] sm:max-w-[440] md:max-w-[460] lg:max-w-[480] p-6 sm:p-8 md:p-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-emerald-400/20 shadow-2xl">
        {/* Logo */}
        <Header subTitle="Descubra novas chances de viralizar" />

        {/* Form */}
        <form className="space-y-4 sm:space-y-5">
          <input
            type="email"
            placeholder="Email ou usuário"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm sm:text-base focus:outline-none focus:border-emerald-400"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm sm:text-base focus:outline-none focus:border-emerald-400"
          />

          <div className="flex justify-between text-xs sm:text-sm text-slate-400">
            <label className="flex gap-2 items-center">
              <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4" />
              Lembrar
            </label>

            <a href="#" className="hover:text-emerald-400">
              Esqueceu?
            </a>
          </div>

          <button className="w-full py-2 sm:py-3 rounded-lg bg-linear-to-r from-emerald-400 to-green-500 text-black font-semibold hover:scale-[1.02] transition shadow-lg shadow-emerald-500/20 text-sm sm:text-base">
            Entrar
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-slate-400 mt-4 sm:mt-6">
          Ainda não tem conta?
          <Link href={"/auth/register"}>
            <span className="text-emerald-400 ml-1 cursor-pointer">
              Criar conta
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
