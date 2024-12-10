import type { Metadata } from "next";
import { FvlocnizationLogsContextProvider } from "./context/fvlconizationLogsContext";

export const metadata: Metadata = {
  title: "Fvlcon",
  description: "Fvlcon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FvlocnizationLogsContextProvider>
      <div className="w-full h-full">
        {children}
      </div>
    </FvlocnizationLogsContextProvider>
  );
}
