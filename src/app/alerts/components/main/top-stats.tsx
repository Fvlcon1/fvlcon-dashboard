import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const PriorityCard = ({
    title,
    figure
} : {
    title : string
    figure : string
}) => {
    return (
        <div className="flex flex-col">
            <Text
                textColor={theme.colors.text.primary}
                bold={TypographyBold.md}
            >
                {title}
            </Text>
            <Text
                size={TypographySize.HL3}
                bold={TypographyBold.md}
                className="mt-[-7px]"
            >
                {figure}
            </Text>
        </div>
    )
}

const TopStats = () => {
    return (
        <div className="w-full h-[100px] flex items-center border-[1px] border-bg-quantinary gap-12 bg-bg-secondary px-8 py-4 rounded-lg">
            <div className="flex flex-col">
                <Text
                    textColor={theme.colors.text.primary}
                    size={TypographySize.HL2}
                    bold={TypographyBold.md}
                >
                    Priorities
                </Text>
                <Text>
                    View and manage alerts based on their urgency level
                </Text>
            </div>
            <div className="flex gap-12 items-center h-full">
                <div className="h-full w-[1px] bg-bg-alt1" />
                <PriorityCard 
                    title="High Priority"
                    figure="08"
                />
                <div className="h-full w-[1px] bg-bg-alt1" />
                <PriorityCard 
                    title="Medium Priority"
                    figure="19"
                />
                <div className="h-full w-[1px] bg-bg-alt1" />
                <PriorityCard 
                    title="Low Priority"
                    figure="34"
                />
            </div>
        </div>
    )
}
export default TopStats