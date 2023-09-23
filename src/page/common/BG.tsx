import { ReactNode } from "react";

export const BG = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div className="bg-background w-screen h-screen">
      <div className="bg-white h-full mx-auto max-w-3xl flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
