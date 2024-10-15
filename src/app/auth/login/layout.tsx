'use client'

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="w-full">
        {children}
      </div>
    </SessionProvider>
  );
}
