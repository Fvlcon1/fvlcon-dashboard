import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Fvlcon",
  description: "Fvlcon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/auth/login?error=Please login")
  }
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
