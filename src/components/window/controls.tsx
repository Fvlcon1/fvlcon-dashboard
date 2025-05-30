import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { MdCancel } from "react-icons/md"

const Controls = ({
    open,
    setOpen,
    title,
    icons,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    icons?: ReactNode[];
}) => {
    return (
        <div className="sticky rounded-t-xl z-[1] backdrop-filter backdrop-blur-lg top-0 left-0 w-full bg-[#141414e7] border-solid border-b-[1px] border-b-bg-quantinary">
            <Flex justify="space-between" padding="5px 10px 5px 10px" align="center">
                {
                    icons ? (
                        <div className="flex gap-1">
                            {icons.map((icon, index) => (
                                <div key={index}>{icon}</div>
                            ))}
                        </div>
                    ) : (
                        <Flex width="fit-content">
                            <div className="w-[9px] h-[9px] rounded-full bg-bg-alt1"></div>
                            <div className="w-[9px] h-[9px] rounded-full bg-bg-alt1"></div>
                            <div className="w-[9px] h-[9px] rounded-full bg-bg-alt1"></div>
                        </Flex>
                    )
                }
                <AppTypography textColor={theme.colors.text.primary}>{title}</AppTypography>
                <ClickableTab
                    className="hover:!bg-bg-alt1 !rounded-full !px-2 !py-2"
                    onClick={() => setOpen(false)}
                >
                    <MdCancel color={theme.colors.text.primary} />
                </ClickableTab>
            </Flex>
        </div>
    );
};
export default Controls;
