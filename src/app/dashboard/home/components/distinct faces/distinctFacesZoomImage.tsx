import Overlay from "@components/overlay/overlay"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"

const DistinctFacesZoomImage = ({
    show,
    setShow,
    imageURL
} : {
    show : boolean,
    setShow : React.Dispatch<React.SetStateAction<boolean>>
    imageURL : string
}) => {
    return (
        <AnimatePresence>
            {
                show &&
                <Overlay
                    onClick={()=>setShow(false)}
                >
                    <div 
                        className="w-fit relative h-[70%] rounded-md bg-bg-primary flex justify-center flex-col items-center overflow-hidden"
                        onClick={()=>setShow(false)}
                    >
                        <div className=""></div>
                        <Image 
                            src={imageURL} 
                            alt="Uploaded Image"
                            width={0}
                            height={0}
                            sizes="large"
                            className={`rounded-lg w-auto h-full`}
                        />
                    </div>
                </Overlay>
            }
        </AnimatePresence>
    )
}
export default DistinctFacesZoomImage