import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TrackingProvider from "./context/trackingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fvlcon",
  description: "Fvlcon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TrackingProvider>
      {children}
    </TrackingProvider>
  );
}
