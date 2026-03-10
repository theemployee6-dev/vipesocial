import React from "react";

const GlowBackground = () => {
  return (
    <>
      <div className="absolute w-[700] h-[700] bg-emerald-500/20 blur-[180px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200] h-[600] bg-emerald-400/5 blur-[150px] rounded-full pointer-events-none" />
    </>
  );
};

export default GlowBackground;
