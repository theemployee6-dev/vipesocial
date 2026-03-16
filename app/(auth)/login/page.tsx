"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";

import FieldInput from "../register/components/Field/Field";
import SubmitButton from "../register/components/SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchemas } from "./schemas/loginSchemas";
import { useState } from "react";
import { routesString } from "../../../shared/constants/routesString";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions/loginAction";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchemas),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await loginAction(data);

      if ("success" in result) {
        reset();
        router.replace(`${routesString.dashboard}/${result.userId}`);
      } else {
        alert(result.error); // ou use um toast
        console.error("Erro no login:", result.error);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Exceção na chamada da action:", error);
      alert("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-9 4k:space-y-10"
      >
        <section className="fade-up delay-1">
          <FieldInput
            label="E-Mail"
            type="email"
            placeholder="seu@email.com"
            icon={<EnvelopeIcon size={20} />}
            registration={register("email")}
            error={errors.email?.message}
            disabled={loading}
          />
        </section>

        <section className="fade-up delay-2">
          <FieldInput
            label="Senha"
            type="password"
            placeholder="••••••••"
            registration={register("password")}
            error={errors.password?.message}
            disabled={loading}
          />
        </section>

        <div className="flex justify-between items-center text-xs sm:text-sm fade-up delay-3">
          <label
            htmlFor="remember"
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="remember"
              className="w-3 h-3 sm:w-4 sm:h-4 accent-emerald-400"
            />
            <span className="text-slate-400">Lembrar</span>
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-emerald-400 hover:underline"
          >
            Esqueceu?
          </Link>
        </div>
        <div className="relative flex flex-col items-center fade-up delay-4">
          <section className="w-full lg:w-[70%] xl:w-[65%] 2xl:w-[60%] 4k:w-[50%]">
            <SubmitButton title="Entrar" size="full" loading={loading} />
          </section>
        </div>
      </form>
    </>
  );
}
