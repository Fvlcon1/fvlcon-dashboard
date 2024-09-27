import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { logsType } from '../../../../../utils/@types';
import getDate, { getTime } from "@/utils/getDate"
import theme from "@styles/theme"

const AllLogs = ({
    display, 
    setDisplay,
    logs,
    setLogs
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    logs : logsType[],
    setLogs: Dispatch<SetStateAction<logsType[]>>
}) => {
    const logContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      }, [logs]);
    return (
        <AnimatePresence>
            {
                display &&
                    <Overlay
                        onClick={()=>setDisplay(false)}
                    >
                        <Window
                            open={display}
                            setOpen={setDisplay}
                            title="Logs"
                        >
                            <div 
                                ref={logContainerRef}
                                className="flex flex-col p-3 overflow-auto h-full"
                            >
                                <AnimatePresence>
                                    {
                                        logs.map((log, index) => (
                                            <motion.div
                                                className="flex gap-2"
                                                key={index} // Make sure each element has a unique key
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex">
                                                    <AppTypography className="whitespace-nowrap">
                                                        {`[${getDate(log.date, { shortmonth: true })} ${getTime(log.date)}]`}
                                                    </AppTypography>
                                                </div>
                                                <AppTypography
                                                    textColor={theme.colors.text.primary}
                                                    ellipsis={log.log.maxLines ? true : false}
                                                    maxLines={log.log.maxLines}
                                                    className={`${log.log.content === 'Analyzing...' && index === logs.length - 1 ? 'animate-pulse' : ''}`}
                                                >
                                                    {log.log.content}
                                                </AppTypography>
                                            </motion.div>
                                        ))
                                    }
                                </AnimatePresence>
                            </div>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default AllLogs