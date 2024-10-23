import { cameraFolderType, cameraType, FolderOrCamera } from "@/utils/@types";
import { Dispatch, SetStateAction } from "react";
import { getFolderLength } from "./getCamOrFolderLength";

/**
 * Recursively loops to find and update the open property of a folder
 * @param items FolderOrCamera[]
 * @param folderId string
 * @param state boolean
 * @returns FolderOrCamera[]
 */
export const updateFolderOpenProperty = (
    items: FolderOrCamera[],
    folderId: string,
    state?: boolean
): FolderOrCamera[] => {
    return items.map((item) => {
        if (item.type === 'folder') {
            if (item.id === folderId) {
                return {
                    ...item, open: state !== undefined ? state : !item.open
                };
            }
            return { ...item, cameras: updateFolderOpenProperty(item.cameras, folderId, state) };
        }
        return item;
})};

/**
 * Recursively loops to find folder or camera which was selected and unselects it
 * @param folder FolderOrCamera
 * @returns FolderOrCamera
 */
export const unsetSelectRecursion = (folder: FolderOrCamera) : FolderOrCamera => {
    if(folder.select){
        return {
            ...folder,
            select : false
        }
    } 
    if(folder.type === 'folder' && folder.cameras){
        return {
            ...folder,
            cameras : folder.cameras.map((item, index) => unsetSelectRecursion(item))
        }
    } else {
        return folder
    }
}

/**
 * Recursively loops to find and update the content of a folder or stream
 * @param items 
 * @param id 
 * @param update 
 * @returns 
 */
export const updateItemById = (
    items: FolderOrCamera[],
    id: string,
    update: Partial<cameraFolderType | cameraType>
): FolderOrCamera[] => {
    return items.map((item) => {
        if (item.id === id) {
            if (item.type === 'folder') {
                return { ...item, ...(update as Partial<cameraFolderType>) };
            }
            if (item.type === 'camera') {
                return { ...item, ...(update as Partial<cameraType>) };
            }
        }
        if (item.type === "folder") {
            return {
                ...item,
                cameras: updateItemById(item.cameras, id, update),
            };
        }
        return item;
    });
};

/**
 * Gets and return the folder or camera that is currently being renamed
 * @param folders FolderOrCamera[]
 * @returns FolderOrCamera
 */
export const getRenamingElement = (folders : FolderOrCamera[]) : FolderOrCamera => {
    const folder = folders.map((folder, i) => {
        if(folder.type === 'folder'){
            if(folder.renaming)
                return folder
            return getRenamingElement(folder.cameras)
        } else {
            if(folder.renaming)
                return folder
        }
    })
    return folder.filter((item, i) => item !== undefined)[0]
}

/**
 * Recursively loops to find and rename a folder or stream
 * @param folder FolderOrCamera
 * @param folderID string
 * @returns FolderOrCamera
 */
export const renameFolder = (folder : FolderOrCamera, folderID : string) : FolderOrCamera => {
    if(folder.id === folderID){
        return {
            ...folder,
            renaming : true,
            select : true
        }
    } else {
        if(folder.type === 'folder' && folder.cameras){
            return {
                ...folder,
                cameras : folder.cameras.map((item, index) => renameFolder(item, folderID))
            }
        } else {
            return folder
        }
    }
}

/**
 * Adds a folder or stream to a sub folder
 * @param folders FolderOrCamera[]
 * @param folder cameraFolderType
 * @param folderID string
 * @returns cameraFolderType
 */
export const addFolderToSubFolder = (folders: FolderOrCamera[], folder : cameraFolderType, folderID? : string) : cameraFolderType => {
    if(folder.id === folderID){
        return {
            ...folder,
            cameras : [
                ...folder.cameras,
                {
                    id: `folder${getFolderLength(folders) + 1}`,
                    type: "folder",
                    folderName: `New Folder${getFolderLength(folders) + 1}`,
                    open : false,
                    hover: false,
                    cameras : [],
                    renaming : true,
                    select : true,
                    activeMenu : false
                }
            ]
        }
    } else {
        if(folder.cameras){
            return {
                ...folder,
                cameras : folder.cameras.map((item, i) => {
                    if(item.type === 'folder'){
                        return addFolderToSubFolder(folders, item, folderID)
                    } else {
                        return item
                    }
                })
            }
        } else {
            return folder
        }
    }
}

/**
 * Adds a new folder to list
 * @param folders FolderOrCamera[]
 * @param setFolders Dispatch<SetStateAction<FolderOrCamera[]>>
 * @param folderID string
 */
export const addNewFolder = (folders: FolderOrCamera[], setFolders: Dispatch<SetStateAction<FolderOrCamera[]>>, folderID? : string) => {
    if(folderID){
        setFolders(prev => prev.map((item, i) => {
            if(item.type === 'folder'){
                console.log("add new folder")
                return addFolderToSubFolder(folders, item, folderID)
            } else {
                return item
            }
        }))
    } else {
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
}

/**
 * Renames a folder
 * @param folderID string
 * @param setFolders Dispatch<SetStateAction<FolderOrCamera[]>>
 * @param setFoldername Dispatch<SetStateAction<string>>
 */
export const rename = (folderID : string, setFolders: Dispatch<SetStateAction<FolderOrCamera[]>>, setFoldername: Dispatch<SetStateAction<string>>) => {
    setFolders(prev => 
        prev.map((folder, index) => renameFolder(folder, folderID))
    )
    setFoldername('')
}

/**
     * Gets and returns the most recent folder or camera
     * @param folders FolderOrCamera[]
     * @param length number
     * @returns FolderOrCamera
     */
const getkNewlyCreatedFolder = (folders : FolderOrCamera[], length : number) : FolderOrCamera => {
    const folder = folders.map((folder, i) => {
        if(folder.type === 'folder'){
            if(folder.id === `folder${length}`)
                return folder
            return getkNewlyCreatedFolder(folder.cameras, length)
        }
    })
    return folder.filter((item, i) => item !== undefined)[0]
}

/**
 * Unselects or unhighlight a folder or camera which was being renamed
 * @param setFolders Dispatch<SetStateAction<FolderOrCamera[]>>
 */
export const unsetSelect = (setFolders: Dispatch<SetStateAction<FolderOrCamera[]>>) => {
    setFolders(prev => 
        prev.map((item, index) => unsetSelectRecursion(item))
    )
}

/**
 * Checks if a folder or camera is being renamed and sets renaming to false
 * @param folder FolderOrCamera
 * @param foldername string
 * @returns FolderOrCamera | undefined
 */
export const getChangedFolderName = (folder: FolderOrCamera, foldername: string): FolderOrCamera | undefined => {
    if(folder.type === 'folder'){
        if (folder.renaming) {
            return {
                ...folder,
                folderName: `${foldername}`,
                renaming: false
            };
        }
    } else {
        if(folder.type === 'camera'){
            if (folder.renaming) {
                return {
                    ...folder,
                    name: `${foldername}`,
                    renaming: false
                };
            }
        }
    }
    return undefined;
}

/**
 * Recursively loop to find a folder or camera that is being renamed and sets renaming to false
 * @param folder FolderOrCamera
 * @param foldername string
 * @returns FolderOrCamera
 */
export const handleFolderNameChangeRecursive = (folder: FolderOrCamera, foldername: string): FolderOrCamera => {
    const updatedFolder = getChangedFolderName(folder, foldername);
    if (updatedFolder) return updatedFolder;

    if(folder.type === 'folder'){
        if (folder.cameras) {
            return {
                ...folder,
                cameras: folder.cameras.map((cam) =>
                    handleFolderNameChangeRecursive(cam, foldername)
                ),
            };
        }
    }
    return folder;
};