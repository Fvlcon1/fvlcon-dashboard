import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { FaCamera, FaLocationArrow } from "react-icons/fa6"
import { IoIosVideocam } from "react-icons/io"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"

const CamDetails = () => {
    return (
        <div className="bg-gradient-container w-[35%] p-3 rounded-lg flex flex-col gap-2">
            <div className="relative rounded-sm overflow-hidden h-[200px]">
                <Image
                    src={require('@/assets/dev/cctv1.png')} 
                    alt="test-bg"
                    fill
                    style={{ objectFit: "cover" }}
                    className="lg:hover:scale-[1.4] scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                /> 
            </div>
            <div className="flex flex-col gap-2 overflow-y-hidden">
                <div className="w-full py-2 px-3 gap-2 rounded-md bg-gradient-container flex flex-col">
                    <div className="flex gap-1 items-center">
                        <FaCamera size={11} color={theme.colors.text.secondary}/>
                        <Text>
                            Camera Name •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;Accra City Camera
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <FaLocationArrow size={11} color={theme.colors.text.secondary}/>
                        <Text>
                            Last seen •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;Ayeduase, new site
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <IoPin size={11} color={theme.colors.text.secondary}/>
                        <Text>
                            Location •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;Town council
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <MdOutlineShareLocation size={11} color={theme.colors.text.secondary}/>
                        <Text>
                            Coordinates •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;5.23432, 30.23523
                            </Text>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CamDetails