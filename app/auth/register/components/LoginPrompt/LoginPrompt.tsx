// components/LoginPrompt.tsx
import Link from "next/link";

interface LoginPromptProps {
  question?: string;
  linkText?: string;
  href?: string;
}

const LoginPrompt = ({
  question = "Já tem uma conta?",
  linkText = "Entrar agora",
  href = "/auth/login",
}: LoginPromptProps) => {
  return (
    <p className="text-center text-xs sm:text-sm md:text-base text-slate-400 mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-9 4k:mt-10">
      {question}{" "}
      <Link href={href}>
        <span className="text-emerald-400 font-semibold hover:underline cursor-pointer">
          {linkText}
        </span>
      </Link>
    </p>
  );
};

export default LoginPrompt;
