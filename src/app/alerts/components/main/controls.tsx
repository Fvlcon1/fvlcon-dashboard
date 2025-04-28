import Button from "@components/button/button"
import Input from "@components/input/input"
import theme from "@styles/theme"
import { useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"

const Controls = () => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className="flex gap-2 items-center">
            <div className="w-[500px] relative">
                <Input 
                    content={searchValue}
                    setContent={setSearchValue}
                    className="!rounded-lg"
                    placeholder="Search for alerts"
                />
                <div className="w-[50px] h-full flex items-center justify-center absolute right-0 top-0 bg-main-primary rounded-r-lg">
                    <FaMagnifyingGlass 
                        color={theme.colors.text.primary}
                        size={14}
                    />
                </div>
            </div>
            <Button
                text="Add Alert +"
                className="!bg-main-primary"
            />
        </div>
    )
}
export default Controls