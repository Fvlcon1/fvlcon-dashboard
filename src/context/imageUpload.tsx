'use client'

import { mediaType } from '@/app/dashboard/home/components/images/controls';
import React, { createContext, useState, ReactNode } from 'react';

export const imageUploadContext = createContext<{
    images : mediaType[],
    setImages: React.Dispatch<React.SetStateAction<mediaType[]>>,
    selectedImage : mediaType | undefined,
    setSelectedImage : React.Dispatch<React.SetStateAction<mediaType | undefined>>
}>({
    images : [],
    selectedImage : undefined,
    setSelectedImage : ()=>{},
    setImages : ()=>{}
});

export const ImageUploadProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<mediaType[]>([])
    const [selectedImage, setSelectedImage] = useState<mediaType | undefined>(undefined)
    return (
        <imageUploadContext.Provider value={{ 
            images, 
            setImages,
            selectedImage,
            setSelectedImage
         }}>
            {children}
        </imageUploadContext.Provider>
    );
};
