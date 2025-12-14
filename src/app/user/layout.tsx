import Navigation from "@/components/navigation";
import React, { ReactNode } from "react";

const layout = ({children}:{children: ReactNode}) => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-screen px-4 md:px-8 border-b border-b-gray-200 h-[6vh] flex items-center">
        <Navigation />
      </header>
      <main className="px-4 md:px-8 mt-[6vh]">{children}</main>
    </div>
  );
};

export default layout;
