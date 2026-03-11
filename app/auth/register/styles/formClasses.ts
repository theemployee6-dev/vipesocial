// formClasses.ts
export const inputClass = `
  w-full 
  px-4 py-3.5          /* mobile pequeno: um pouco mais de espaço */
  sm:px-6 sm:py-3      /* sm: 6 */
  md:px-10 md:py-4    /* md: 10 */
  lg:px-10 lg:py-4     /* lg: 10 (seu valor) */
  xl:px-12 xl:py-4     /* xl: 12 (cresce) */
  2xl:px-14 2xl:py-5   /* 2xl: 14 */
  4k:px-16 4k:py-8     /* 4k: 16 */
  
  rounded-xl
  sm:rounded-xl
  md:rounded-xl
  lg:rounded-2xl
  xl:rounded-2xl
  2xl:rounded-3xl
  4k:rounded-[40px]
  
  bg-[#1e293b] border border-slate-700
  text-white
  text-[14px]
  sm:text-sm
  md:text-md
  lg:text-base
  xl:text-base
  2xl:text-lg
  4k:text-xl
  
  placeholder-slate-500
  focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20
  transition-all duration-200
`;

export const selectClass = `
  w-full 
  px-3 py-4
  sm:px-4 sm:py-3
  md:px-5 md:py-3.5
  lg:px-6 lg:py-4
  xl:px-7 xl:py-4
  2xl:px-8 2xl:py-6
  4k:px-10 4k:py-8
  
  rounded-xl
  sm:rounded-xl
  md:rounded-xl
  lg:rounded-2xl
  xl:rounded-2xl
  2xl:rounded-3xl
  4k:rounded-[40px]
  
  bg-[#1e293b] border border-slate-700
  text-slate-400
  text-xs
  sm:text-sm
  md:text-sm
  lg:text-base
  xl:text-base
  2xl:text-lg
  4k:text-xl
  
  focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20
  transition-all duration-200 
  appearance-none cursor-pointer
`;
export const labelClass = `
  text-slate-400 
  text-[10px]           /* base: 10px */
  sm:text-[11px]        /* sm: 11px */
  md:text-[12px]        /* md: 12px */
  lg:text-[13px]        /* lg: 13px */
  xl:text-sm            /* 14px */
  2xl:text-base         /* 16px */
  4k:text-lg            /* 18px */
  
  font-semibold 
  tracking-[0.15em] 
  uppercase 
  mb-1 
  sm:mb-1.5 
  md:mb-2 
  lg:mb-2.5 
  xl:mb-3 
  2xl:mb-4 
  4k:mb-6 
  block
`;
