import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsClientCtxProvider } from "@/context/isClientCtx";
import { LiveProvider } from "@/context/live";
import { Suspense } from "react";
import HydrationLoader from "@components/loaders/hydrationLoader";
import 'react-loading-skeleton/dist/skeleton.css'

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <HydrationLoader>
          <Suspense>
            <IsClientCtxProvider>
              <LiveProvider>
                <ToastContainer />
                {children}
              </LiveProvider>
            </IsClientCtxProvider>
          </Suspense>
        </HydrationLoader>
      </body>
    </html>
  );
}
