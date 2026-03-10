import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-[250] sm:w-[280] md:w-[320] lg:w-[360] xl:w-[400] 2xl:w-[440] 4k:w-[500] aspect-7/2">
      <Image
        src="/assets/img/logo/logo_transparent.png"
        alt="logo-image"
        fill
        sizes="(min-width: 2560px) 500px, (min-width: 1536px) 440px, (min-width: 1280px) 400px, (min-width: 1024px) 360px, (min-width: 768px) 320px, (min-width: 640px) 280px, 250px"
        className="object-contain"
        priority
        quality={85}
      />
    </div>
  );
};

export default Logo;
