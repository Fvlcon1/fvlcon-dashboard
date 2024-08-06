import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { FaImage } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import UploadedImage from "./uploadedImage"

const Images = () => {
    return (
        <div  className="fixed right-[82px] gap-2 w-[150px] flex flex-col h-[100vh] py-4">
            <Flex
                align="center"
                justify="space-between"
            >
                <AppTypography>
                    4 items
                </AppTypography>
                <Button 
                    text="Upload +"
                    icon={<FaImage className="mt-[-1px]"/>}
                />
            </Flex>
            <div className="w-full h-full rounded-lg overflow-y-auto">
                <Flex
                    direction="column"
                >
                    {
                        [1,2,3].map((item, index) => (
                            <UploadedImage 
                                key={index}
                            />
                        ))
                    }
                </Flex>
            </div>
        </div>
    )
}
export default Images