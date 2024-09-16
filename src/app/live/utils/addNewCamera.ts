import { Dispatch, SetStateAction } from "react"
import { getCamLength } from "./getCamOrFolderLength"
import { cameraFolderType, FolderOrCamera } from "@/utils/@types"

export const addNewCamera = ({
    folderID, 
    setFolders,
    folders
} : {
    folderID? : string
    folders: FolderOrCamera[]
    setFolders : Dispatch<SetStateAction<FolderOrCamera[]>>
}) => {
    const addCam = (folder : cameraFolderType, folderID : string) : cameraFolderType => {
        if(folder.id === folderID){
            return {
                ...folder,
                cameras : [
                    ...folder.cameras,
                    {
                        id : `cam${getCamLength(folders) + 1}`,
                        type : 'camera',
                        name : `cam${getCamLength(folders) + 1}`,
                        hover : false,
                        activeMenu : false,
                        active : false,
                        renaming : true,
                        select : true
                    }
                ]
            }
        } else {
            return {
                ...folder,
                cameras : folder.cameras.map((item, index) => {
                    if(item.type === 'folder'){
                        return addCam(item, folderID)
                    } else {
                        return item
                    }
                })
            }
        }
    }

    if(folderID){
        setFolders(prev => 
            prev.map((folder, index) => {
                if(folder.type === 'folder'){
                    return addCam(folder, folderID)
                } else {
                    return folder
                }
            })
        )
    }
    else {
        setFolders(prev => [
            ...prev,
            {
                id : `cam${getCamLength(folders) + 1}`,
                type : 'camera',
                name : `cam${getCamLength(folders) + 1}`,
                hover : false,
                activeMenu : false,
                active : false,
                renaming : true,
                select : true
            }
        ])
    }
}