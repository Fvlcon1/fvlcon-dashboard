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
import { MdDelete } from "react-icons/md";
import { FaFolderClosed, FaRegFolderOpen, FaCaretRight } from "react-icons/fa6";
import { HiVideoCamera } from "react-icons/hi";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { ClickAwayListener } from "@mui/base";
import { getFolderLength } from "./addFolderOrCamera";
import { deleteCam } from "./helpers";

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
            icon: <MdDelete color={theme.colors.text.secondary} />,
        },
    ];

    const getkNewlyCreatedFolder = (folders : FolderOrCamera[]) : cameraFolderType => {
        const folder = folders.map((folder, i) => {
            if(folder.type === 'folder'){
                console.log(folder.id, `folder${getFolderLength(folders)}`)
                if(folder.id === `folder${getFolderLength(folders)}`)
                    return folder
                return getkNewlyCreatedFolder(folder.cameras)
            }
        })
        return folder.filter((item, i) => item !== undefined)[0]
    }

    useEffect(()=>{
        if(folders){
            setHasUpdatedFolderName(false)
            const newFolder = getkNewlyCreatedFolder(folders)
            if(newFolder && newFolder?.renaming){
                setFoldername(newFolder.folderName)
            }
        }
    },[folders])

    useEffect(()=>{
        if(folders){
            const newFolder = getkNewlyCreatedFolder(folders)
            if(newFolder && newFolder?.renaming && hasUpdatedFolderName === false){
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
            <div className={`flex flex-col gap-1 ${!camOrfolder.open && 'overflow-hidden'}`}>
                <div 
                    className="flex duration-300 h-[20px] w-full hover:bg-bg-alt1 px-2 py-2 rounded-md cursor-pointer justify-between"
                    onClick={() => setFolderVisibility(camOrfolder.id)}    
                >
                    <div className="flex ml-[-3px] gap-2 justify-center items-center">
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
                                    <div><VscKebabVertical color={theme.colors.text.primary} size={13} /></div>
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
                                        <RiMenuUnfoldLine color={theme.colors.text.primary} size={10} />
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
