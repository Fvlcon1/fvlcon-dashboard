import theme from "@styles/theme"
import { BiSolidMessageSquareEdit } from "react-icons/bi"
import { FaArchive } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"

const Actions = () => {
    const actions = [
        {
            name : "Edit",
            icon : BiSolidMessageSquareEdit
        },
        {
            name : "Delete",
            icon : FaTrash
        },
        {
            name : "Archive",
            icon : FaArchive
        },
    ]

    return (
        <div className="flex gap-1">
            {
                actions.map((action, index) => (
                    <div 
                        className="flex h-[25px] w-[25px] gap-1 hover:scale-[0.94] duration-200 items-center cursor-pointer justify-center rounded-md bg-bg-alt1"
                        key={index}
                    >
                        <action.icon 
                            color={theme.colors.text.primary}
                        />
                    </div>
                ))
            }
        </div>
    )
}
export default Actions