'use client'

import { liveContext } from "@/context/live"
import { FolderOrCamera, menuItemsTypes } from "@/utils/@types"
import Button from "@components/button/button"
import ClickableTab from "@components/clickable/clickabletab"
import MenuItems from "@components/popover/menuItems"
import Popover from "@components/popover/popover"
import theme from "@styles/theme"
import { useContext, useState } from "react"
import { AiFillFolderAdd } from "react-icons/ai"
import { IoIosAddCircle } from "react-icons/io"
import { RiAddLine, RiVideoAddFill } from "react-icons/ri"

export const getFolderLength = (folders : FolderOrCamera[]) : number => {
    let len = 0
    folders.map((folder, i) => {
        if(folder.type === 'folder'){
            len = len + 1
            if(folder.cameras.length > 0){
                const sublen = getFolderLength(folder.cameras)
                len = sublen + len
            }
        }
    })
    return len
}

export const getCamLength = (folders : FolderOrCamera[]) : number => {
    let len = 0
    folders.map((folder, i) => {
        if(folder.type === 'camera'){
            len = len + 1
        } else {
            if(folder.cameras.length > 0){
                const sublen = getFolderLength(folder.cameras)
                len = sublen + len
            }
        }
    })
    return len
}

const AddFolderOrCamera = () => {
    const [showMenu, setShowMenu] = useState(false)
    const {folders, setFolders} = useContext(liveContext)


    const addNewFolder = () => {
        setFolders(prev => [
            ...prev,
            {
                id: `folder${getFolderLength(folders) + 1}`,
                type: "folder",
                folderName: `New Folder${getFolderLength(folders) + 1}`,
                open : false,
                hover: false,
                cameras : [],
                renaming : true,
                activeMenu : false
            }
        ])
    }

    const addNewCamera = (folderID? : string) => {
        if(!folderID){
            setFolders(prev => [
                ...prev,
                {
                    id : `cam${getCamLength(folders) + 1}`,
                    type : 'camera',
                    name : `cam${getCamLength(folders) + 1}`,
                    hover : false,
                    activeMenu : false,
                    active : false
                }
            ])
        }
    }

    const menuitems: menuItemsTypes[] = [
        {
            name: "Add Folder",
            onClick: addNewFolder,
            closeOnClick: true,
            icon: <AiFillFolderAdd color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Add Cam",
            onClick: ()=>addNewCamera(),
            closeOnClick: true,
            icon: <RiVideoAddFill color={theme.colors.text.secondary} size={14} />,
        },
    ];
    return (
        <Popover
            show={showMenu}
            close={()=>setShowMenu(false)}
            content={
                <MenuItems 
                    closeFunction={()=>setShowMenu(false)} 
                    items={menuitems} 
                    id={'AddFolderOrCamera'}
                />
            }
        >
            <Button 
                text=""
                className="!p-1 !bg-bg-quantinary hover:!bg-bg-alt1"
                icon={
                    <RiAddLine
                        color={theme.colors.text.secondary}
                        size={13}
                    />
                }
                onClick={()=>setShowMenu(true)}
            />
        </Popover>
    )
}

export default AddFolderOrCamera