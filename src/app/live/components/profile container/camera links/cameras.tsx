'use client'

import Flex from "@styles/components/flex";
import { Fragment, useContext, useEffect, useState } from "react";
import { liveContext } from "@/context/live";
import FolderList from "./folderList";
import { protectedAPI } from "@/utils/api/api";
import { message } from "antd";
import { cameraFolderType, FolderOrCamera } from "@/utils/@types";
import { cameraType } from '../../../../../utils/@types';
import { addNewFolder } from "@/app/live/utils/helpers";
import { IoVideocamOff } from "react-icons/io5";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import InfinityLoader from "@components/loaders/infinityLoader";
import Skeleton from 'react-loading-skeleton'

const privateAPI = new protectedAPI()
const Cameras = () => {
    const {folders, setFolders, setActiveCameras} = useContext(liveContext)
    const [folderState, setFolderState] = useState<'loading' | null>(null)

    const recursivelySetStreamOrFolders = (streamsAndFolders : FolderOrCamera[], streamOrFolder : FolderOrCamera, folderId : string) : FolderOrCamera[] => {
        return streamsAndFolders.map((item) => {
            if(item.type === 'folder'){
                if(item.id === folderId){
                    return {
                        ...item,
                        cameras : [...item.cameras, streamOrFolder]
                    }
                } else {
                    return {
                        ...item,
                        cameras : recursivelySetStreamOrFolders(item.cameras, streamOrFolder, folderId)
                    }
                }
            } else {
                return item
            }
        })
    }

    /**
     * Arranges streams, thus puts streams into their respective folders
     * @param streams any
     */
    const organizeStreams = (streams : any, folderArray : FolderOrCamera[]) => {
        let streamsAndFolders : FolderOrCamera[] = folderArray
        streams.map((stream : any, index : number) => {
            const NewStream : cameraType = {
                id: stream.id,
                type: "camera",
                name: stream.name,
                hover: false,
                activeMenu: false,
                active: false,
            }
            if(stream.cameraFolderId){
                streamsAndFolders = recursivelySetStreamOrFolders(streamsAndFolders, NewStream, stream.cameraFolderId)
            } else {
                streamsAndFolders = [...streamsAndFolders, NewStream]
            }
            console.log({streamsAndFolders})
        })
        setFolders(streamsAndFolders)
        setTimeout(() => {
            setFolderState(null)
        }, 6000);
    }

    /**
     * Gets streams from api and arranges them into their respective folders
     * @param folderArray FolderOrCamera
     */
    const getStreams = async (folderArray : FolderOrCamera[]) => {
        try {
            const response = await privateAPI.get("/stream/getAllStreams")
            const streams = response?.data
            organizeStreams(streams, folderArray)
        } catch (error) {
            message.error("Error loading streams")
            console.log({error})
        }
    }

    /**
     * Gets folders from api and sets them
     */
    const getFolders = async () => {
        setFolderState('loading')
        try {
            const response = await privateAPI.get("/cameraFolder/getAllFolders")
            const folders = response?.data
            if(folders){
                const folderArray : FolderOrCamera[] = folders.map((folder : any) => {
                    const newFolder : cameraFolderType = {
                        id : folder.id,
                        type : "folder",
                        folderName: folder.name,
                        cameras: [],
                        open: false,
                        hover: false,
                        activeMenu: false,
                    }
                    return newFolder
                })
                getStreams(folderArray)
            }
        } catch (error) {
            setFolderState(null)
            message.error("Error getting folders")
            console.log({error})
        }
    }

    useEffect(()=>{
        // getFolders()
    },[])

    return (
        folderState === 'loading' ?
        <Skeleton 
            count={3} 
            baseColor={theme.colors.bg.tetiary}
            highlightColor={theme.colors.bg.alt1}
        />
        :
        folders.length > 0 ?
        <Flex direction="column" padding="8px" gap={4}>
            {
                folders.map((item, index: number) => (
                    <Fragment key={item.id}>
                        {
                            item.type === "folder" && (
                                <FolderList
                                    camOrfolder={item}
                                    index={index}
                                    folders={folders}
                                    setFolders={setFolders}
                                />
                        )}
                        {
                            item.type === "camera" && (
                                <FolderList 
                                    camOrfolder={item}
                                    index={index}
                                    folders={folders}
                                    setFolders={setFolders}
                                />
                            )
                        }
                    </Fragment>
                ))
            }
        </Flex>
        :
        <div className="flex w-full justify-center items-center flex-col py-4">
            <IoVideocamOff
                color={theme.colors.text.tetiary}
                size={30}
            />
            <Text
                textColor={theme.colors.text.tetiary}
            >
                No streams available
            </Text>
        </div>
    );
};

export default Cameras;
