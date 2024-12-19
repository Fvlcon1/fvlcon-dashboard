import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import LeftSidebar from "./components/leftSidebar";
import Wrapper from "./components/wrapper";
import "./components/antdCustomStyle.css"
import { SegmentationLogsContextProvider } from "./segmentationLogs/context/segmentationLogsContext";

export const metadata: Metadata = {
  title: "Activity log",
  description: "Activity log",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/auth/login")
  }
  return (
    <div className="w-full">
      <SegmentationLogsContextProvider>
        <LeftSidebar />
        <Wrapper>
          {children}
        </Wrapper>
      </SegmentationLogsContextProvider>
    </div>
  );
}
