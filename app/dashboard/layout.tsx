import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p4">
      {children}
    </div>
  );
};

export default Layout;
