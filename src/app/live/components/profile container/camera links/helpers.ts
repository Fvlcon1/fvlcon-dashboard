import { FolderOrCamera } from "@/utils/@types";
import { Dispatch, SetStateAction } from "react";

const filterCamDelete = (folders: FolderOrCamera[], id: string): FolderOrCamera[] => {
    return folders.map((item) => {
        if (item.type === "camera" && item.id === id) {
            return null;
        }

        if (item.type === "folder") {
            if (item.id === id) {
                return null;
            }
            if (item.cameras) {
                return {
                    ...item,
                    cameras: filterCamDelete(item.cameras, id),
                };
            }
        }
        return item;
    }).filter((item) => item !== null);
};

export const deleteCam = (folders: FolderOrCamera[], id: string, setFolders: Dispatch<SetStateAction<FolderOrCamera[]>>) => {
    setFolders(filterCamDelete(folders, id));
};
