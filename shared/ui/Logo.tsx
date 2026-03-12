import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-full aspect-7/2">
      <Image
        src="/assets/img/logo/logo_transparent.png"
        alt="logo-image"
        fill
        sizes="(max-width: 768px) 100px, 150px"
        className="object-contain"
        priority
        quality={75}
      />
    </div>
  );
};

export default Logo;
