import { ReactNode } from "react";
import LoadModels from "./home/components/load models/loadModels";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { message } from "antd"

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/auth/login?error=Please login")
  }
  return (
    <div className="w-full max-w-[1500px]">
      {children}
      <LoadModels />
    </div>
  );
}
