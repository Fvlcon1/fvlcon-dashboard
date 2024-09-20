'use client'

import Flex from "@styles/components/flex";
import { Fragment, useContext } from "react";
import { liveContext } from "@/context/live";
import FolderList from "./folderList";

const Cameras = () => {
    const {folders, setFolders} = useContext(liveContext)

    return (
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
    );
};

export default Cameras;
