import Button from "@components/button/button"
import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react"
import { MdCancel } from "react-icons/md"

export const Modal = ({
    display,
    setDisplay,
    onOkayClick,
    onCancel,
    children,
    title,
    okayButtonText
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>,
    onOkayClick? : ()=>void
    onCancel? : ()=>void
    children? : ReactNode,
    title? : string,
    okayButtonText? : string
}) => {
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        onOkayClick && onOkayClick()
        setDisplay(false)
    }

    return (
        <>
        <AnimatePresence>
            {
                display &&
                <Overlay
                    onClick={()=>{
                        onCancel && onCancel()
                        setDisplay(false)
                    }}
                >
                    <form
                        className="w-full max-w-[400px] bg-bg-secondary rounded-2xl border-solid border-[1px] border-bg-quantinary overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full relative flex h-[50px] justify-between items-center px-4 py-2 bg-bg-tetiary border-b-solid border-b-[1px] border-b-bg-quantinary ">
                            <div className="flex flex-1 justify-center">
                                <Text
                                    textColor={theme.colors.text.primary}
                                >
                                    {title ?? 'Confirm'}
                                </Text>
                            </div>
                            <div className="absolute right-0 pr-4 h-full flex items-center">
                                <ClickableTab
                                    onClick={()=>{
                                        onCancel && onCancel()
                                        setDisplay(false)
                                    }}
                                >
                                    <MdCancel 
                                        color={theme.colors.text.primary} 
                                        onClick={()=>setDisplay(false)}
                                    />
                                </ClickableTab>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <div className="flex w-full px-5 justify-center py-5">
                                {children}
                            </div>
                            <div className="w-full flex min-h-[50px] justify-between items-center p-2 border-t-solid border-t-[1px] border-t-bg-quantinary">
                                <div className="w-full flex gap-2">
                                    <Button
                                        text='Cancel'
                                        type="button"
                                        className='!w-full !bg-transparent hover:!bg-bg-quantinary border-solid border-[1px] border-bg-quantinary'
                                        size={{
                                            height : '45px'
                                        }}
                                        onClick={()=>setDisplay(false)}
                                    />
                                    <Button
                                        text={okayButtonText ?? 'Okay'}
                                        type="submit"
                                        className='!w-full !bg-bg-quantinary hover:!bg-bg-alt1'
                                        size={{
                                            height : '45px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Overlay>
            }
        </AnimatePresence>
        </>
    )
}
export default Modal