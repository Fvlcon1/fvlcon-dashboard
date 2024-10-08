import Text from "@styles/components/text"
import theme from "@styles/theme"
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
                            Match
                        </Text>
                    </div>
                </th>
                <th className="py-2">
                    <div className="flex gap-1 items-center">
                        <IoPersonCircle
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text textColor={theme.colors.text.primary}>
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
                        <TbGenderMale
                            color={theme.colors.text.primary}
                            size={13}
                        />
                        <Text textColor={theme.colors.text.primary}>
                            Gender
                        </Text>
                    </div>
                </th>
            </tr>
        </thead>
    )
}
export default TableHead