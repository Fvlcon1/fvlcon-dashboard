import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaLocationArrow } from "react-icons/fa6"
import { IoPersonCircle } from "react-icons/io5"
import { MdDateRange } from "react-icons/md"
import { PiDetectiveFill } from "react-icons/pi"
import { TbGenderMale } from "react-icons/tb"

const TableHead = () => {
    return (
        <thead>
            <tr className="bg-bg-primary">
                <th className="py-2">
                    <div className="flex gap-1 items-center pl-3">
                        <PiDetectiveFill
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text textColor={theme.colors.text.primary}>
                            Captured
                        </Text>
                    </div>
                </th>
                <th className="py-2">
                    <div className="flex gap-1 items-center">
                        <IoPersonCircle
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text 
                            textColor={theme.colors.text.primary}
                            whiteSpace="nowrap"
                        >
                            Identified Person
                        </Text>
                    </div>
                </th>
                <th className="py-2">
                    <div className="flex gap-1 items-center">
                        <MdDateRange
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text textColor={theme.colors.text.primary}>
                            Date
                        </Text>
                    </div>
                </th>
                <th className="py-2">
                    <div className="flex gap-1 items-center">
                        <FaLocationArrow
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text textColor={theme.colors.text.primary}>
                            Location
                        </Text>
                    </div>
                </th>
            </tr>
        </thead>
    )
}
export default TableHead