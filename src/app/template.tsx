'use client'

import { ReactNode } from "react";
import Topbar from "./dashboard/home/components/topbar";
import Left from "@components/sidebar/left";
import Right from "@components/sidebar/right";
import Flex from "@styles/components/flex";
import { usePathname } from "next/navigation";
import { noTempalteRoutes, noTempalteRoutes_startsWith } from "@/utils/constants"
import { SessionProvider, useSession } from "next-auth/react";
import LogoutPrompt from "@components/modal/logoutPrompt";

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <SessionProvider>
            <SuspenseContainer>
                {children}
            </SuspenseContainer>
        </SessionProvider>
    );
};

const SuspenseContainer = ({
    children
} : {
    children ? : ReactNode
}) => {
    const { status } = useSession();
    const pathname = usePathname();
    const showTemplate = (status === 'authenticated') && !noTempalteRoutes_startsWith.some(route => pathname.startsWith(route)) && !noTempalteRoutes.includes(pathname)
    const showPrompt = (status === 'unauthenticated') && !noTempalteRoutes_startsWith.some(route => pathname.startsWith(route)) && !noTempalteRoutes.includes(pathname)
    return (
        <LogoutPrompt showPrompt={showPrompt}>
            <Flex justify="center" height="100%">
                <div className="w-full h-full flex justify-center">
                    { showTemplate && <Left /> }
                    {children}
                    { showTemplate && <Right /> }
                </div>
            </Flex>
        </LogoutPrompt>
    )
}

export default Template;
