'use client'

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Suspense>
      <SessionProvider>
        <div className="w-full max-w-[1500px]">
          {children}
        </div>
      </SessionProvider>
    </Suspense>
  );
}
