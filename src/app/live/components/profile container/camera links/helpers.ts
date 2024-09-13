import { FolderOrCamera } from "@/utils/@types";
import { Dispatch, SetStateAction } from "react";

const filterCamDelete = (folders: FolderOrCamera[], id: string): FolderOrCamera[] => {
    return folders.filter((item) => {
        if (item.type === "camera") {
            return item.id !== id;
        }
        if (item.type === "folder") {
            if (item.cameras) {
                item.cameras = filterCamDelete(item.cameras, id);
            }
            return true;
        }
        return true;
    });
};

export const deleteCam = (folders: FolderOrCamera[], id: string, setFolders : Dispatch<SetStateAction<FolderOrCamera[]>>) => {
    setFolders(filterCamDelete(folders, id))
}