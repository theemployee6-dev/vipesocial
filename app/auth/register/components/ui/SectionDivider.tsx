import React from "react";

const SectionDivider = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 4k:gap-8 mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 2xl:mb-10 4k:mb-12 fade-up delay-8">
      <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 4k:w-32 h-px bg-slate-700" />
      <span className="text-slate-500 text-[10px] sm:text-xs md:text-[13px] lg:text-sm xl:text-base 2xl:text-lg 4k:text-xl tracking-widest uppercase whitespace-nowrap">
        {title}
      </span>
      <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 4k:w-32 h-px bg-slate-700" />
    </div>
  );
};

export default SectionDivider;
