import Text from "@styles/components/text"
import List from "./list"
import theme from "@styles/theme"
import { ReactNode } from "react"

const Container = ({
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
        <div className="w-full rounded-lg border-[1px] border-solid border-bg-quantinary bg-bg-tetiary overflow-hidden">
            <div className="w-full border-b-[1px] border-solid border-b-bg-quantinary bg-bg-secondary py-3 px-4 flex justify-center">
                <Text
                    textColor={theme.colors.text.primary}
                >
                    {title}
                </Text>
            </div>
            {children}
        </div>
    )
}
export default Container