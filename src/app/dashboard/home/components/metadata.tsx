import { imageUploadContext } from "@/context/imageUpload"
import { formatFileSize } from "@/utils/formatFileSize"
import { getRelativeTime } from "@/utils/getDate"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Slidein from "@styles/components/slidein"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext } from "react"

const Metadata = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const metadata = {
        name : selectedImage?.fullFile.name,
        size : selectedImage?.fullFile.size,
        type : selectedImage?.fullFile.type,
        lastModified : selectedImage?.fullFile.lastModified
    }

    return (
        <Flex
            flex={1}
            maxWidth="50%"
        >
            <Slidein className="!w-full">
                {
                    selectedImage?.fullFile &&
                    <Flex
                        direction="column"
                        padding="0 5px"
                    >
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            size={TypographySize.HM}
                        >
                            Meta Info
                        </AppTypography>
                        <AppTypography>
                            Name : {metadata.name}
                        </AppTypography>
                        <AppTypography>
                            Size : {formatFileSize(metadata.size || 0 )}
                        </AppTypography>
                        <AppTypography>
                            Type : {metadata.type}
                        </AppTypography>
                        <AppTypography>
                            Last Modified : {metadata.lastModified && getRelativeTime(new Date(metadata.lastModified))}
                        </AppTypography>
                    </Flex>
                }
            </Slidein>
        </Flex>
    )
}
export default Metadata