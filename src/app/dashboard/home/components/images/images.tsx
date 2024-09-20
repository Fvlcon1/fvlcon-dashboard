import Flex from "@styles/components/flex"
import UploadedFile from "./uploadedFile"
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { imagesType } from "./controls"
import { imageUploadContext } from "@/context/imageUpload"

const Images = () => {
    const {
        images, 
        setImages,
    } = useContext(imageUploadContext)

    return (
        <div className={`w-full ${images && images.length > 0 ? 'bg-none' : 'bg-gradient-container'} h-full rounded-lg overflow-y-auto`}>
                <Flex
                    direction="column"
                >
                    {
                        images?.map((item, index) => (
                            <UploadedFile 
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