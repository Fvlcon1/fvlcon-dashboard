'use client';

import Button from "@components/button/button";
import AppTypography from "@styles/components/appTypography";
import Flex from "@styles/components/flex";
import { FaImage } from "react-icons/fa6";
import Images from "./images";
import { useContext, useEffect, useRef } from "react";
import { imageUploadContext } from "@/context/imageUpload";

export type mediaType = {
    url: string;
    name: string;
    fullFile: File;
    type: "image" | "video"; // Add type to distinguish between images and videos
    sizes: {
        width: number;
        height: number;
    };
};

const Controls = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { images, setImages } = useContext(imageUploadContext);

    const inputClicked = () => {
        inputRef.current?.click();
    };

    const onFileSelected = (e: FileList | null) => {
        if (e) {
            Array.from(e).forEach((file) => {
                const mediaUrl = URL.createObjectURL(file);
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");
                
                if (isImage || isVideo) {
                    if (isImage) {
                        // Handle image file
                        const img = new window.Image();

                        img.onload = () => {
                            setImages((prev) => [
                                ...prev,
                                {
                                    url: mediaUrl,
                                    name: file.name,
                                    fullFile: file,
                                    type: "image",
                                    sizes: { width: img.naturalWidth, height: img.naturalHeight },
                                },
                            ]);
                        };

                        img.src = mediaUrl;
                    } else if (isVideo) {
                        // Handle video file
                        const video = document.createElement("video");

                        video.onloadedmetadata = () => {
                            setImages((prev) => [
                                ...prev,
                                {
                                    url: mediaUrl,
                                    name: file.name,
                                    fullFile: file,
                                    type: "video",
                                    sizes: { width: video.videoWidth, height: video.videoHeight },
                                },
                            ]);
                        };

                        video.src = mediaUrl;
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (inputRef.current?.value?.length && inputRef.current?.value?.length > 0) {
            inputRef.current.value = '';
        }
    }, [images]);

    return (
        <div className="fixed items-end right-[82px] gap-2 w-[150px] flex flex-col h-[100vh] py-4">
            <input 
                ref={inputRef}
                type="file" 
                multiple
                accept="image/*,video/*" // Allow both images and videos
                onChange={(e) => onFileSelected(e.target.files)}
                className="hidden"
            />
            <Button
                text="Upload +"
                icon={<FaImage className="mt-[-1px]" />}
                onClick={inputClicked}
            />
            <Images />
        </div>
    );
};

export default Controls;