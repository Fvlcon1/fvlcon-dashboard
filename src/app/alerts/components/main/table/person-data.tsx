import { AlertData, PersonData } from "@/app/alerts/utils/types"
import { getDateTime, getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import PriorityCard from "./priority-card"
import Actions from "./actions"
import theme from "@styles/theme"
import { formatString } from "@/app/dashboard/home/utils/formatString"
import { TypographySize } from "@styles/style.types"
import Image from "next/image"
import { useState } from "react"

const ImageComponent = ({
    item
} : {
    item : AlertData
}) => {
    const [zoomImage, setZoomImage] = useState<string>('')
    const [zoom, setZoom] = useState(false)
    
    return item.type === "person" ? (
        <div className="w-[50px] relative h-[50px] rounded-lg overflow-hidden bg-bg-quantinary">
            <Image
                src={item.imageUrl} 
                alt="profile image"
                fill
                style={{ objectFit: "cover" }}
                onClick={()=>{
                    setZoomImage(item.imageUrl)
                    setZoom(prev => !prev)
                }}
                className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
            /> 
        </div>
    ) : null
}

export const personData = (item : AlertData) : PersonData | null =>  {
    return item.type === "person" ? {
        left : (
            <div className="flex gap-2 items-center">
                {/* Image */}
                <ImageComponent item={item} />
    
                {/* Info */}
                <div className="flex flex-col">
                    {/* Type */}
                    <div className="flex items-center gap-1">
                        <div className="w-[2px] h-[10px] bg-main-primary rounded-full" />
                        <Text
                            textColor={theme.colors.main.primary}
                            size={TypographySize.xs}
                        >
                            {formatString(item.type)}
                        </Text>
                    </div>
    
                    {/* Name */}
                    <div className="flex items-center gap-1">
                        <Text>
                            Name:
                        </Text>
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {item.name}
                        </Text>
                    </div>
    
                    {/* Other info */}
                    <div className="flex items-center gap-1">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {`${formatString(item.gender)}${item.gender ? " | " : ""}${item.ageRange}${item.gender ? " | " : ""}Wanted for ${formatString(item.reason)}`}
                        </Text>
                    </div>
                </div>
            </div>
        ),
        recipients : (
            <div className="flex flex-col">
                <Text>
                    Recipients:
                </Text>
                <Text textColor={theme.colors.text.primary}>
                    {item.recipients.join(", ")}
                </Text>
            </div>
        ),
        dateCreated : (
            <div className="flex gap-1">
                <Text>
                    Added:
                </Text>
                <Text textColor={theme.colors.text.primary}>
                    {getRelativeTime(new Date(item.dateCreated))}
                </Text>
            </div>
        ),
        priority : (
            <PriorityCard priority={item.priority} />
        ),
        actions : (
            <Actions />
        )
    } : null
}