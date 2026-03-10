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
        <Logo />
      </div>

      <div className="space-y-1 md:space-y-2">
        <p className="text-emerald-400 text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-xl 4k:text-2xl font-semibold tracking-[0.2em] uppercase">
          {firstSmallTitle}
        </p>
        <h1 className="syne text-white text-2xl sm:text-3xl md:text-xl lg:text-5xl xl:text-4xl 2xl:text-7xl 4k:text-8xl font-bold leading-tight">
          {secondBigTitleWhite}
          <span className="text-emerald-400">{secondBigTitleGreen}</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-3xl 4k:text-4xl">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default Header;
