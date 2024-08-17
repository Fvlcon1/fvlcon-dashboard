import { hexOpacity } from "@/utils/hexOpacity"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import theme from "@styles/theme"
import Image from "next/image"
import { useState } from "react"

const ImageContainer = ({
    MiddleButtonTitle,
    MiddleButtonClick,
    imageURL,
    hostedURL
} : {
    imageURL? : string
    hostedURL? : string
    MiddleButtonTitle? : string,
    MiddleButtonClick? : ()=> void,
}) => {
    const [hover, setHover] = useState(false)
    return (
        <div 
            className="w-full rounded-lg bg-bg-tetiary p-2 cursor-pointer"
            onMouseOver={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >
            <div className="w-[full] relative h-[150px] rounded-md bg-bg-primary flex justify-center items-center overflow-hidden">
                <img 
                    src={imageURL} 
                    alt="Uploaded Image"
                    width={0}
                    height={0}
                    className={`${hover && MiddleButtonTitle && 'scale-[1.3] !z-0'} duration-300 w-full h-auto`}
                />
                {
                    MiddleButtonTitle &&
                    <div 
                        className={`absolute rounded-md flex justify-center items-center w-full h-full backdrop-filter  ${hover && 'backdrop-blur-sm'} top-0 duration-300`}
                        style={{
                            backgroundColor : hover ? `${theme.colors.bg.primary}${hexOpacity(50)}` : ''
                        }}
                        onClick={MiddleButtonClick}
                    >
                        {
                            hover &&
                            <ClickableTab className={`hover:!bg-[#00000040]`}>
                                <AppTypography
                                    textColor={theme.colors.text.primary}
                                >
                                    Analyze ➜
                                </AppTypography>
                            </ClickableTab>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default ImageContainer