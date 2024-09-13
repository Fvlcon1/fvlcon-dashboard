import { FolderOrCamera } from "@/utils/@types";

export const camdata : FolderOrCamera[] = [
    {
        id: "folder1",
        type: "folder",
        folderName: "Local",
        open : false,
        hover: false,
        cameras: [
            {
                id: "cam1",
                type: "camera",
                name: "Testing cam",
                hover: false,
                activeMenu: false,
                active: false,
            },
            {
                id: "cam2",
                type: "camera",
                name: "Seattle",
                hover: false,
                activeMenu: false,
                active: true,
            },
        ],
    },
    {
        id: "folder2",
        type: "folder",
        folderName: "Stream",
        open : false,
        hover: false,
        cameras: [
            {
                id: "cam3",
                type: "camera",
                name: "Testing cam",
                hover: false,
                activeMenu: false,
                active: false,
            },
            {
                id: "cam4",
                type: "camera",
                name: "Seattle",
                hover: false,
                activeMenu: false,
                active: true,
            },
        ],
    },
    {
        id: "folder3",
        type: "folder",
        open : false,
        folderName: "hosted",
        hover: false,
        cameras: [
            {
                id: "folder4",
                type: "folder",
                open : false,
                folderName: "Local",
                hover: false,
                cameras: [
                    {
                        id: "cam5",
                        type: "camera",
                        name: "Testing cam",
                        hover: false,
                        activeMenu: false,
                        active: false,
                    },
                    {
                        id: "cam6",
                        type: "camera",
                        name: "Seattle",
                        hover: false,
                        activeMenu: false,
                        active: true,
                    },
                ],
            },
            {
                id: "cam7",
                type: "camera",
                name: "London",
                hover: false,
                activeMenu: false,
                active: true,
            },
            {
                id: "cam8",
                type: "camera",
                name: "Disney park cam",
                hover: false,
                activeMenu: false,
                active: false,
            },
        ],
    },
]