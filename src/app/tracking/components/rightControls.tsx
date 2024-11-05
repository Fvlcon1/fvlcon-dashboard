'use state'

import Button from "@components/button/button"
import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useContext, useEffect, useRef, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { FaCaretDown, FaSort } from "react-icons/fa6"
import { HiTemplate } from "react-icons/hi"
import { IoImage } from "react-icons/io5"
import { MdDoneAll } from "react-icons/md"
import { trackingContext } from "../context/trackingContext"

const RightControls = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {imageUrl, setImageUrl} = useContext(trackingContext)

    const inputClicked = () => {
        inputRef.current?.click()
    }

    const onFileSelected = (e: FileList | null) => {
        if (e) {
            for (let file of e) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result as string;
                    setImageUrl(base64String);
                };
                reader.readAsDataURL(file);
                setImageUrl('')
            }
        }
    };

    useEffect(()=>{
        if(inputRef.current?.value?.length && inputRef.current?.value?.length > 0){
            inputRef.current.value = ''
        }
    }, [imageUrl])

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
                <input 
                    ref={inputRef}
                    type="file"
                    onChange={e=>onFileSelected(e.target.files)}
                    className="hidden"
                />
                <Button 
                    text=""
                    onClick={inputClicked}
                    className="border-dashed border-[1px] border-bg-alt1"
                    icon={
                        <IoImage
                            color={theme.colors.text.secondary}
                            size={15}
                    />
                    }
                />
                <div className={`flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-quantinary items-center`}>
                    <MdDoneAll
                        color={theme.colors.text.primary}
                        size={12}
                    />
                    <Text textColor={theme.colors.text.primary}>
                        All
                    </Text>
                </div>
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaUserAlt
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        People
                    </Text>
                </div>
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <HiTemplate
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text
                        whiteSpace="nowrap"
                    >
                        Number plates
                    </Text>
                </div>
            </div>
            {/* <div className="flex">
                <div className="rounded-l-lg bg-bg-tetiary hover:bg-bg-quantinary cursor-pointer gap-1 p-2 flex items-center px-4 border-r-[1px] border-r-solid border-bg-alt1">
                    <Text>
                        Last 7 days
                    </Text>
                    <FaCaretDown
                        color={theme.colors.text.secondary}
                    />
                </div>
                <div className="rounded-r-lg gap-1 cursor-pointer hover:bg-bg-quantinary bg-bg-tetiary p-2 flex items-center px-4">
                    <Text>
                        March 20 - March 30
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                    />
                </div>
            </div> */}
            <div className="flex gap-2 w-full">
                <Searchbar
                    className="bg-bg-secondary rounded-lg flex-1"
                    inputStyle="bg-bg-secondary rounded-lg"
                />
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaSort
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        Sort
                    </Text>
                </div>
            </div>
        </div>
    )
}
export default RightControls