import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-full aspect-7/2">
      <Image
        src="/assets/img/logo/logo_transparent.png"
        alt="logo-image"
        fill
        className="object-contain"
        priority
        quality={85}
      />
    </div>
  );
};

export default Logo;
