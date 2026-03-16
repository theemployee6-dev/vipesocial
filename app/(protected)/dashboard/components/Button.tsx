import Link from "next/link";

const Button = ({ btnText, href }: { btnText: string; href: string }) => {
  return (
    <Link
      href={href}
      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
    >
      {btnText}
    </Link>
  );
};

export default Button;
