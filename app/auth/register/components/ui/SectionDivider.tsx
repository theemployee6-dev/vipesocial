import React from "react";

const SectionDivider = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3 mb-7 fade-up delay-8">
      <div className="flex-1 h-px bg-slate-700" />
      <span className="text-slate-500 text-[10px] tracking-widest uppercase">
        {title}
      </span>
      <div className="flex-1 h-px bg-slate-700" />
    </div>
  );
};

export default SectionDivider;
