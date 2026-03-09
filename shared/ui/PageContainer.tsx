// shared/ui/PageContainer.tsx
import "@/components/Register/styles/animations.css";
export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-10 relative overflow-hidden">
    {children}
  </div>
);
