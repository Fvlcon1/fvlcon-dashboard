import Text from "@styles/components/text"
import theme from "@styles/theme"
import { ReactNode } from "react"
import { TypographySize } from "@styles/style.types"

const DownloadbleContainer = ({
    title,
    children
} : {
    title? : string
    children? : ReactNode
}) => {
    const data = [
        ["Telephone number", "059134990"],
        ["Email", "princenedjoh5@gmail.com"],
        ["TIN", "4490"],
        ["Driver License/Passport No", "990242344"],
        ["Occupation", "Investor"],
        ["Owner's signature", "kjdflkgjdf"],
    ]

    return (
        <div className="w-full rounded-lg py-2 border-[1px] border-solid border-bgLight-tetiary bg-transparent overflow-hidden">
            <div className="px-4">
                <Text
                    textColor={theme.colors.textLight.primary}
                    size={TypographySize.HM}
                >
                    {title}
                </Text>
            </div>
            {children}
        </div>
    )
}
export default DownloadbleContainer