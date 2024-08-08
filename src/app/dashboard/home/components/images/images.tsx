import Flex from "@styles/components/flex"
import UploadedImage from "./uploadedImage"
import { Dispatch, SetStateAction } from "react"

const Images = ({
    images,
    setImages
} : {
    images? : string[],
    setImages: Dispatch<SetStateAction<string[]>>
}) => {
    return (
        <div className={`w-full ${images && images.length > 0 ? 'bg-none' : 'bg-gradient-container'} h-full rounded-lg overflow-y-auto`}>
                <Flex
                    direction="column"
                >
                    {
                        images?.map((item, index) => (
                            <UploadedImage 
                                key={index}
                                image={item}
                                setImages={setImages}
                            />
                        ))
                    }
                </Flex>
            </div>
    )
}
export default Images