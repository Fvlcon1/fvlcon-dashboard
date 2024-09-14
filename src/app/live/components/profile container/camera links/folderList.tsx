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
import { ClickAwayListener } from "@mui/base";
import { getCamLength, getFolderLength } from "./addFolderOrCamera";
import { deleteCam } from "./helpers";
import { AiFillFolderAdd } from "react-icons/ai";

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
    const [hasUpdatedFolderName, setHasUpdatedFolderName] = useState(false)
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

    const getChangedFolderName = (folder: cameraFolderType): cameraFolderType | undefined => {
        if (folder.id === `folder${getFolderLength(folders)}`) {
            return {
                ...folder,
                folderName: `${foldername}`,
                renaming: false
            };
        }
        return undefined;
    }

    const handleFolderNameChangeRecursive = (folder: cameraFolderType): cameraFolderType => {
        const updatedFolder = getChangedFolderName(folder);
        if (updatedFolder) return updatedFolder;

        if (folder.cameras) {
            return {
                ...folder,
                cameras: folder.cameras.map((cam) =>
                    cam.type === "folder" ? handleFolderNameChangeRecursive(cam) : cam
                ),
            };
        }
        return folder;
    };

    const handleFolderNameChange = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setFolders((prev) =>
            prev.map((item) => {
                if (item.type === "folder") {
                    console.log("is folder")
                    const folder = getChangedFolderName(item);
                    if (folder) {
                        console.log({folder})
                        return folder;
                    } else {console.log("no updated folder")}
                    if (item.cameras) {
                        return {
                            ...item,
                            cameras: item.cameras.map((cam) =>
                                cam.type === "folder" ? handleFolderNameChangeRecursive(cam) : cam
                            ),
                        };
                    }
                }
                return item;
            })
        );
    };

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
        setActiveCameras((prev) => [...prev, 1]);
    };

    const cameraMenuItems: menuItemsTypes[] = [
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

    const getkNewlyCreatedFolder = (folders : FolderOrCamera[], length : number) : cameraFolderType => {
        const folder = folders.map((folder, i) => {
            if(folder.type === 'folder'){
                console.log({id : folder.id, id2 : `folder${length}`})
                if(folder.id === `folder${length}`)
                    return folder
                return getkNewlyCreatedFolder(folder.cameras, length)
            }
        })
        return folder.filter((item, i) => item !== undefined)[0]
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

    const addNewCamera = (folderID? : string) => {
        if(folderID){
        }
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

    const folderMenuItems: menuItemsTypes[] = [
        {
            name: "Add Folder",
            onClick: (index, id)=>addNewFolder(id),
            closeOnClick: true,
            icon: <AiFillFolderAdd color={theme.colors.text.secondary} size={14} />,
        },
        {
            name: "Add Cam",
            onClick: (index, id)=>addNewCamera(id),
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
            setHasUpdatedFolderName(false)
            const newFolder = getkNewlyCreatedFolder(folders, getFolderLength(folders))
            console.log({newFolder})
            if(newFolder && newFolder?.renaming){
                setFoldername(newFolder.folderName)
            }
        }
    },[folders])

    useEffect(()=>{
        if(folders){
            const newFolder = getkNewlyCreatedFolder(folders, getFolderLength(folders))
            if(newFolder && newFolder?.renaming && !hasUpdatedFolderName){
                if(renamingInputRef.current){
                    setTimeout(() => {
                        renamingInputRef.current?.select()
                    }, 200);
                }
                setHasUpdatedFolderName(true)
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
            <div
                onMouseOver={() => setHover(camOrfolder.id)}
                onMouseLeave={() => setHover(camOrfolder.id, false)}
                draggable
            >
                <Popover
                    show={camOrfolder.activeMenu}
                    close={() => setActiveMenu(camOrfolder.id, false)}
                    content={<MenuItems items={cameraMenuItems} id={camOrfolder.id} />}
                >
                    <Flex className="duration-300 hover:bg-bg-alt1 rounded-md px-2 py-[2px] cursor-pointer justify-center items-center">
                        <div>
                            <HiVideoCamera 
                                color={camOrfolder.active ? '#970119' : theme.colors.text.secondary} 
                                className={`${camOrfolder.active && 'animate-pulse'}`}
                            />
                        </div>
                        <Flex direction="column" gap={0}>
                            <AppTypography textColor={theme.colors.text.secondary} ellipsis maxLines={1}>
                                {camOrfolder.name}
                            </AppTypography>
                        </Flex>
                        <AnimatePresence>
                            {(camOrfolder.hover || camOrfolder.activeMenu) && (
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
                </Popover>
            </div>
        )
    );
};

export default FolderList;
