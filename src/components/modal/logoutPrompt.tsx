import Button from "@components/button/button";
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text";
import { TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import { signOut } from "next-auth/react";
import { ReactNode } from "react"
import { TiWarning } from "react-icons/ti";

const LogoutPrompt = ({
    children,
    showPrompt
} : {
    children? : ReactNode,
    showPrompt? : boolean
}) => {
    return (
        <>
            {
                showPrompt &&
                <Overlay>
                    <div
                        className="w-full max-w-[400px] h-[280px] bg-bg-secondary rounded-2xl border-solid border-[1px] border-bg-quantinary overflow-hidden"
                    >
                        <div className="w-full h-[100px] bg-bg-tetiary border-b-solid border-b-[1px] border-b-bg-quantinary flex justify-center items-center">
                            <TiWarning 
                                color={theme.colors.text.secondary}
                                size={50}
                            />
                        </div>
                        <div className="w-full h-[180px] mt-[-5px] flex flex-col gap-1 flex-1 justify-center items-center px-5 py-4">
                            <Text 
                                size={TypographySize.HL}
                                textColor={theme.colors.text.primary}
                            >
                                Session Expired
                            </Text>
                            <Text
                                size={TypographySize.HM}
                                textAlign="center"
                            >
                                Your session has expired due to inactivity. Please log in again to continue.
                            </Text>
                            <Button
                                text='Login'
                                type='submit'
                                onClick={signOut}
                                className='!w-full !bg-bg-quantinary hover:!bg-bg-alt1 mt-[3px]'
                                size={{
                                    height : '45px'
                                }}
                            />
                        </div>
                    </div>
                </Overlay>
            }
            {children}
        </>
    )
}
export default LogoutPrompt