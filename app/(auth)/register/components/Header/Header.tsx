import Logo from "@/shared/ui/Logo";

const Header = ({
  firstSmallTitle,
  secondBigTitleWhite,
  secondBigTitleGreen,
  subTitle,
}: {
  firstSmallTitle?: string;
  secondBigTitleWhite?: string;
  secondBigTitleGreen?: string;
  subTitle?: string;
}) => {
  return (
    <div className="text-center mb-8 md:mb-6 lg:mb-8 xl:mb-8 2xl:mb-16 4k:mb-16 fade-up">
      <div className="inline-flex items-center gap-2 mb-4 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-8 4k:mb-10">
        <div className="w-[190] xs:w-[150] sm:w-[220] md:w-[190] lg:w-[200] xl:w-[200] 2xl:w-[280] 4k:w-[340]">
          <Logo />
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <p className="text-emerald-400 text-[12px] xs:text-[14px] sm:text-sm md:text-xs lg:text-base xl:text-sm 2xl:text-xl 4k:text-2xl font-semibold tracking-[0.2em] uppercase">
          {firstSmallTitle}
        </p>
        <h1 className="Poppins text-white text-[16px] xs:text-sm sm:text-2xl md:text-[20px] lg:text-2xl xl:text-xl 2xl:text-4xl 4k:text-7xl font-bold leading-tight">
          {secondBigTitleWhite}
          <span className="text-emerald-400">{secondBigTitleGreen}</span>
        </h1>
        <p className="text-slate-400 pt-5 text-xs xs:text-sm sm:text-[12px] md:text-md lg:text-lg xl:text-sm 2xl:text-xl 4k:text-4xl">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default Header;
