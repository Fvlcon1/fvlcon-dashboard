import { FaImages } from "react-icons/fa6"
import { IoIosStats, IoMdImage } from "react-icons/io"
import { IoPersonCircle } from "react-icons/io5"
import { MdDateRange } from "react-icons/md"
import { HiOutlineStatusOnline } from "react-icons/hi"
import { AiOutlineBars } from "react-icons/ai"
import Text from "@styles/components/text"
import theme from "@styles/theme"

const TableHead = () => {
    const tableHeadData = [
        {
            name : "Capture",
            icon : IoMdImage
        },
        {
            name : "Identified Person",
            icon : IoPersonCircle
        },
        {
            name : "Date",
            icon : MdDateRange
        },

        {
            name : "Perfomance",
            icon : IoIosStats
        },
        {
            name : "Status",
            icon : HiOutlineStatusOnline
        },
        {
            name : "Actions",
            icon : AiOutlineBars
        },
    ]
    return (
        <thead>
            <tr className="bg-bg-secondary">
                {
                    tableHeadData.map((item, index : number) => (
                        <th key={index}>
                            <div className={`flex gap-1 items-center ${index === 0 ? 'pl-3' : index === tableHeadData.length - 1 ? 'pr-3' : 'py-1'}`}>
                                <item.icon
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                                <Text
                                    whiteSpace="nowrap"
                                >
                                    {item.name}
                                </Text>
                            </div>
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}
export default TableHead