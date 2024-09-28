import ClickableTab from "@components/clickable/clickabletab";
import AppTypography from "@styles/components/appTypography";
import Flex from "@styles/components/flex";
import { TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import { Dispatch, FormEvent, Fragment, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
import Popover from "@components/popover/popover";
import { liveContext } from "@/context/live";
import { cameraFolderType, cameraType, FolderOrCamera, menuItemsTypes } from "@/utils/@types";
import MenuItems from "@components/popover/menuItems";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import { FaFolderClosed, FaRegFolderOpen, FaCaretRight } from "react-icons/fa6";
import { HiOutlineDotsVertical, HiVideoCamera } from "react-icons/hi";
import { RiMenuUnfoldLine, RiVideoAddFill } from "react-icons/ri";
import { ClickAwayListener } from "@mui/base"
import { deleteCam } from "./helpers";
import { AiFillFolderAdd } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { addNewCamera } from "@/app/live/utils/addNewCamera";
import { getFolderLength, getCamLength } from '../../../utils/getCamOrFolderLength';

const FolderList = ({
    camOrfolder,
    index,
    folders,
    setFolders
}: {
    camOrfolder: FolderOrCamera;
    index: number;
    setFolders: Dispatch<SetStateAction<FolderOrCamera[]>>;
    folders: FolderOrCamera[];
}) => {
    const [foldername, setFoldername] = useState("New Folder")
    const renamingInputRef = useRef<HTMLInputElement>(null)
    const { 
        activeCameras, 
        setActiveCameras,
    } = useContext(liveContext);

    const updateFolderOpenProperty = (
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

    const changeCamName = (cam: cameraType): cameraType => {
        if (cam.renaming) {
            return {
                ...cam,
                name: `${foldername}`,
                renaming: false
            };
        }
        return cam;
    }

    const getChangedFolderName = (folder: FolderOrCamera): FolderOrCamera | undefined => {
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

    const handleFolderNameChangeRecursive = (folder: FolderOrCamera): FolderOrCamera => {
        const updatedFolder = getChangedFolderName(folder);
        if (updatedFolder) return updatedFolder;

        if(folder.type === 'folder'){
            if (folder.cameras) {
                return {
                    ...folder,
                    cameras: folder.cameras.map((cam) =>
                        handleFolderNameChangeRecursive(cam)
                    ),
                };
            }
        }
        return folder;
    };

    const handleFolderNameChange = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setFolders((prev) =>
            prev.map((item) => {
                if (item.type === "folder") {
                    const folder = getChangedFolderName(item);
                    if (folder) {
                        return folder;
                    }
                    if (item.cameras) {
                        return {
                            ...item,
                            cameras: item.cameras.map((cam) =>
                                handleFolderNameChangeRecursive(cam)
                            ),
                        };
                    } else {
                        return item
                    }
                } else {
                    if(item.type === 'camera'){
                        return changeCamName(item)
                    } else {
                        return item
                    }
                }
            })
        );
    };

    const unsetSelectRecursion = (folder: FolderOrCamera) : FolderOrCamera => {
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

    const unsetSelect = () => {
        setFolders(prev => 
            prev.map((item, index) => unsetSelectRecursion(item))
        )
    }

    const setFolderVisibility = (id: string, state?: boolean) => {
        setFolders((prev) => updateFolderOpenProperty(prev, id, state));
    };

    const updateItemById = (
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

    const setHover = (id: string, state?: boolean) => {
        setFolders((prev) => updateItemById(prev, id, { hover: state !== undefined ? state : true }));
    };

    const setActiveMenu = (id: string, state?: boolean) => {
        setFolders((prev) => updateItemById(prev, id, { activeMenu: state !== undefined ? state : true }));
    };

    const addCamera = () => {
        setActiveCameras((prev) => [...prev, {
            id : '1',
            url : "http://52.20.249.108:8888/towncouncil/channel_1/"
        }]);
    };

    const cameraMenuItems: menuItemsTypes[] = [
        {
            name: "Rename",
            onClick: (index, id)=>rename(id),
            closeOnClick: true,
            icon: <FaEdit color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Add +",
            onClick: () => addCamera(),
            closeOnClick: true,
            icon: <IoIosAddCircle color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Delete",
            onClick: (index, id) => {deleteCam(folders, id, setFolders)},
            closeOnClick: true,
            icon: <MdDeleteSweep color={theme.colors.text.secondary} />,
        },
    ];

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

    const getRenamingElement = (folders : FolderOrCamera[]) : FolderOrCamera => {
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

    const renameFolder = (folder : FolderOrCamera, folderID : string) : FolderOrCamera => {
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

    const rename = (folderID : string) => {
        setFolders(prev => 
            prev.map((folder, index) => renameFolder(folder, folderID))
        )
        setFoldername('')
    }

    const addFolderToSubFolder = (folder : cameraFolderType, folderID? : string) : cameraFolderType => {
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
                            return addFolderToSubFolder(item, folderID)
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

    const addNewFolder = (folderID? : string) => {
        if(folderID){
            setFolders(prev => prev.map((item, i) => {
                if(item.type === 'folder'){
                    return addFolderToSubFolder(item, folderID)
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

    const folderMenuItems: menuItemsTypes[] = [
        {
            name: "Rename",
            onClick: (index, id)=>rename(id),
            closeOnClick: true,
            icon: <FaEdit color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Add Folder",
            onClick: (index, id)=>addNewFolder(id),
            closeOnClick: true,
            icon: <AiFillFolderAdd color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Add Cam",
            onClick: (index, id)=>addNewCamera({
                folders,
                setFolders,
                folderID : id
            }),
            closeOnClick: true,
            icon: <RiVideoAddFill color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Delete",
            onClick: (index, id) => {deleteCam(folders, id, setFolders)},
            closeOnClick: true,
            icon: <MdDeleteSweep color={theme.colors.text.secondary} />,
        },
    ];

    useEffect(()=>{
        if(folders){
            const RenamingElement = getRenamingElement(folders)
            if(RenamingElement && RenamingElement.renaming){
                if(RenamingElement.type === 'folder'){
                    setFoldername(RenamingElement.folderName)
                } else if(RenamingElement.type === 'camera'){
                    setFoldername(RenamingElement.name)
                }
            }
        }
    },[folders])

    useEffect(()=>{
        if(folders){
            const RenamingElement = getRenamingElement(folders)
            if(RenamingElement && RenamingElement.select){
                if(renamingInputRef.current){
                    setTimeout(() => {
                        renamingInputRef.current?.select()
                        unsetSelect()
                    }, 200);
                }
            }
        }
    },[foldername])

    return (
        camOrfolder.type === 'folder' ? (
            <Popover
                show={camOrfolder.activeMenu}
                close={() => setActiveMenu(camOrfolder.id, false)}
                content={<MenuItems items={folderMenuItems} id={camOrfolder.id} closeFunction={() => setActiveMenu(camOrfolder.id, false)} />}
            >
                <div className={`flex flex-col gap-1 ${!camOrfolder.open && 'overflow-hidden'}`}>
                    <div>
                        <div 
                            className="flex duration-300 h-[20px] w-full hover:bg-bg-alt1 px-2 items-center rounded-md cursor-pointer justify-between"
                            onMouseOver={() => setHover(camOrfolder.id)}
                            onMouseLeave={() => setHover(camOrfolder.id, false)}
                            draggable
                        >
                            <div className="flex ml-[-3px] gap-2 items-center flex-1"
                                onClick={() => setFolderVisibility(camOrfolder.id)}  
                            >
                                <div className="flex gap-[4px] items-center">
                                    <div>
                                        <FaCaretRight
                                            color={theme.colors.text.secondary}
                                            className={`${camOrfolder.open ? "rotate-90" : "rotate-0"} duration-300`}
                                        />
                                    </div>
                                    {camOrfolder.open ? (
                                        <div><FaRegFolderOpen color={theme.colors.text.secondary} size={13} /></div>
                                    ) : (
                                        <div><FaFolderClosed color={theme.colors.text.secondary} size={13} /></div>
                                    )}
                                </div>
                                {
                                    camOrfolder.renaming ?
                                    <ClickAwayListener onClickAway={()=>handleFolderNameChange()}>
                                        <form
                                            onSubmit={e => handleFolderNameChange(e)}
                                            className="flex"
                                        >
                                            <input 
                                                type="text"
                                                value={foldername}
                                                className="bg-transparent text-[12px] outline-none rounded-md text-text-secondary w-full"
                                                onChange={e => setFoldername(e.target.value)}
                                                ref={renamingInputRef}
                                            />
                                        </form>
                                    </ClickAwayListener>
                                    :
                                    <AppTypography textColor={theme.colors.text.secondary} ellipsis maxLines={1}>
                                        {camOrfolder.folderName}
                                    </AppTypography>
                                }
                            </div>
                            <AnimatePresence>
                                {camOrfolder.hover && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ClickableTab onClick={() => setActiveMenu(camOrfolder.id)}>
                                            <div><HiOutlineDotsVertical color={theme.colors.text.primary} size={10} /></div>
                                        </ClickableTab>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <motion.div
                            className={`flex transition-all duration-300 ease-in-out ${
                                camOrfolder.open ? "max-h-[200px]" : "max-h-0"
                            } flex-col gap-1 pl-5`}
                        >
                            <div className="flex pl-1 border-l-[1px] border-l-bg-alt1 border-solid flex-col">
                                {camOrfolder.cameras.map((cam, index) => (
                                    <FolderList
                                        camOrfolder={cam}
                                        index={index}
                                        folders={folders}
                                        setFolders={setFolders}
                                        key={cam.id}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Popover>
        ) : (
            <Popover
                show={camOrfolder.activeMenu}
                close={() => setActiveMenu(camOrfolder.id, false)}
                content={<MenuItems items={cameraMenuItems} id={camOrfolder.id} closeFunction={() => setActiveMenu(camOrfolder.id, false)}/>}
            >
                <div
                    onMouseOver={() => setHover(camOrfolder.id)}
                    onMouseLeave={() => setHover(camOrfolder.id, false)}
                    draggable
                >
                    <Flex className="duration-300 hover:bg-bg-alt1 rounded-md px-2 py-[2px] cursor-pointer justify-center items-center">
                        <div>
                            <HiVideoCamera 
                                color={camOrfolder.active ? '#970119' : theme.colors.text.secondary} 
                                className={`${camOrfolder.active && 'animate-pulse'}`}
                            />
                        </div>
                        {
                            camOrfolder.renaming ?
                            <ClickAwayListener onClickAway={()=>handleFolderNameChange()}>
                                <form
                                    onSubmit={e => handleFolderNameChange(e)}
                                    className="flex"
                                >
                                    <input 
                                        type="text"
                                        value={foldername}
                                        className="bg-transparent text-[12px] outline-none rounded-md text-text-secondary w-full"
                                        onChange={e => setFoldername(e.target.value)}
                                        ref={renamingInputRef}
                                    />
                                </form>
                            </ClickAwayListener>
                            :
                            <Flex direction="column" gap={0}>
                                <AppTypography textColor={theme.colors.text.secondary} ellipsis maxLines={1}>
                                    {camOrfolder.name}
                                </AppTypography>
                            </Flex>
                        }
                        <AnimatePresence>
                            {(camOrfolder.hover) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ClickableTab onClick={() => setActiveMenu(camOrfolder.id)}>
                                        <HiOutlineDotsVertical color={theme.colors.text.primary} size={10} />
                                    </ClickableTab>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Flex>
                </div>
            </Popover>
        )
    );
};

export default FolderList;
