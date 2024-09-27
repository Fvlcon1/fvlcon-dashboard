import getDate, { getTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { MdFullscreen } from "react-icons/md"
import AllLogs from "./allLogs"
import Slidein from "@styles/components/slidein"
import { AnimatePresence, motion } from 'framer-motion';
import { logsType } from "@/utils/@types"

const Logs = ({
    logs,
    setLogs
} : {
    logs : logsType[],
    setLogs: Dispatch<SetStateAction<logsType[]>>
}) => {
    const [showFullLogs, setShowFullLogs] = useState(false)
    const logContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      }, [logs]);
    return (
        <Flex
            flex={1}
            maxWidth="50%"
        >
            <Slidein className="!w-full">
                <div  className="w-full relative flex h-[150px] flex-col flex-1 gap-1">
                    <div className="w-full absolute z-0 top-0 bg-gradient-container h-[200px] rounded-lg p-2">
                        <Flex
                            justify="space-between"
                        >
                            <div className="py-1 px-3 bg-bg-primary rounded-lg">
                                <AppTypography
                                    textColor={theme.colors.text.primary}
                                >
                                    Logs
                                </AppTypography>
                            </div>
                            <Flex
                                width="fit-content"
                                align="center"
                                gap={15}
                            >
                                <AppTypography>
                                    {getDate(new Date())}
                                </AppTypography>
                                <AppTypography>
                                    |
                                </AppTypography>
                                <ClickableTab
                                    onClick={()=>setShowFullLogs(true)}
                                >
                                    <AppTypography
                                        textColor={theme.colors.text.primary}
                                        size={TypographySize.HL}
                                    >
                                        <MdFullscreen />
                                    </AppTypography>
                                </ClickableTab>
                            </Flex>
                        </Flex>
                        <div 
                            ref={logContainerRef}
                            className="flex flex-col p-1 overflow-auto h-[100px]"
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
                    </div>
                    <AllLogs 
                        display={showFullLogs}
                        setDisplay={setShowFullLogs}
                        logs={logs}
                        setLogs={setLogs}
                    />
                </div>
            </Slidein>
        </Flex>
    )
}
export default Logs