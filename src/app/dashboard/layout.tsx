import { ReactNode } from "react";
import LoadModels from "./home/components/load models/loadModels";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { HomeContextProvider } from "./home/context/homeContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/auth/login")
  }
  return (
    session &&
    <HomeContextProvider>
      <div className="w-full max-w-[1500px]">
        {children}
        <LoadModels />
      </div>
    </HomeContextProvider>
  );
}
