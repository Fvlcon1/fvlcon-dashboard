import Text from "@styles/components/text"
import List from "./list"
import theme from "@styles/theme"
import { ReactNode } from "react"

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
        <div className="w-full rounded-lg border-[1px] border-solid border-bgLight-primary bg-transparent overflow-hidden">
            <div className="w-full border-b-[1px] border-solid border-bgLight-primary bg-transparent py-3 px-4 flex justify-center">
                <Text
                    textColor={theme.colors.textLight.secondary}
                >
                    {title}
                </Text>
            </div>
            {children}
        </div>
    )
}
export default DownloadbleContainer