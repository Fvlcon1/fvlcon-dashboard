import type { Metadata } from "next";
import { TrackingLogsProvider } from "./context/trackingLogsContext";

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
    <TrackingLogsProvider>
      <div className="w-full h-full">
        {children}
      </div>
    </TrackingLogsProvider>
  );
}
