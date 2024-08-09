import getDate from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { MdFullscreen } from "react-icons/md"
import ImageCard from "./imageCard"

const DistinctFaces = () => {
    return (
        <div  className="w-full relative flex flex-col flex-1 gap-1">
            <div className="w-full absolute z-[-1] top-0 bg-gradient-container h-[200px] rounded-lg">
            </div>
            <div className="w-full rounded-lg px-3 py-2">
                <Flex
                    justify="space-between"
                    align="center"
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                    >
                        Disticnt Faces
                    </AppTypography>
                    <Flex
                        width="fit-content"
                        align="center"
                        gap={15}
                    >
                        <ClickableTab
                            className="hover:!bg-bg-quantinary"
                        >
                            <AppTypography
                                textColor={theme.colors.text.primary}
                            >
                                Analyze all ➜
                            </AppTypography>
                        </ClickableTab>
                        <AppTypography>
                            |
                        </AppTypography>
                        <ClickableTab
                            className="hover:!bg-bg-quantinary"
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
                <div className="w-full overflow-x-auto">
                    <Flex
                        gap={20}
                    >
                        {
                            [1,2,3].map((item, index : number) => (
                                <ImageCard 
                                    key={index}
                                />
                            ))
                        }
                    </Flex>
                </div>
            </div>
        </div>
    )
}
export default DistinctFaces