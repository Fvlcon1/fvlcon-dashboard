import { FolderOrCamera } from "@/utils/@types"

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
                const sublen = getCamLength(folder.cameras)
                len = sublen + len
            }
        }
    })
    return len
}