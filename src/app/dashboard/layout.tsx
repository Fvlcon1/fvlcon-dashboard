import { ReactNode } from "react";
import LoadModels from "./home/components/load models/loadModels";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-full max-w-[1500px]">
      {children}
      <LoadModels />
    </div>
  );
}
