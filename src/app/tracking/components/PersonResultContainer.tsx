import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaLocationArrow, FaLocationCrosshairs } from "react-icons/fa6"

const PersonResultContainer = () => {
    return (
        <div className="w-full px-3 hover:scale-[0.95] duration-200 flex flex-col gap-1 rounded-md">
            <div className="flex gap-2 items-center">
                <div className="rounded-md px-2 py-1 bg-bg-tetiary">
                    <div className="mt-[-2px]">
                        <Text>
                            Person
                        </Text>
                    </div>
                </div>
                <Text>
                    2hrs ago
                </Text>
            </div>
            <div className="flex gap-2 items-center">
                <Text
                    size={TypographySize.HM}
                    textColor={theme.colors.text.primary}
                >
                    Mohammed Ismail
                </Text>
                <Text>
                    • Black Sherif
                </Text>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                    <FaLocationArrow 
                        color={theme.colors.text.secondary}
                        size={13}
                    />
                    <Text>
                        Last seen
                    </Text>
                </div>
                <Text
                    textColor={theme.colors.text.primary}
                >
                    • &nbsp;Kokomlemle, New town
                </Text>
            </div>
            <div className="flex gap-1 items-center">
                <FaLocationCrosshairs 
                    color={theme.colors.text.secondary}
                    size={13}
                />
                <Text>
                    53.2343, 9.4235
                </Text>
            </div>
        </div>
    )
}
export default PersonResultContainer