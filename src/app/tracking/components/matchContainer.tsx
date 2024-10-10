import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"

const MatchContainer = () => {
    return (
        <div className="flex gap-2 relative w-fit">
            <div className="absolute z-10 flex justify-center items-center top-[20%] left-[36%] rounded-full w-[30px] h-[30px] p-[3px] border-[3px] border-solid border-bg-secondary bg-[#0000008f] backdrop-filter backdrop-blur-lg">
                <Text
                    size={TypographySize.xs2}
                    textColor={theme.colors.text.primary}
                >
                    98%
                </Text>
            </div>
            <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-md">
                <Image
                    src={require('@/assets/dev/image1.png')} 
                    alt="test-bg"
                    fill
                    style={{ objectFit: "cover" }}
                    className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                /> 
            </div>
            <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-md">
                <Image
                    src={require('@/assets/dev/image1.png')} 
                    alt="test-bg"
                    fill
                    style={{ objectFit: "cover" }}
                    className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                /> 
            </div>
        </div>
    )
}
export default MatchContainer