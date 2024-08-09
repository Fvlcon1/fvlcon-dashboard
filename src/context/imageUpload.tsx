'use client'

import { imagesType } from '@/app/dashboard/home/components/images/controls';
import React, { createContext, useState, ReactNode } from 'react';

export const imageUploadContext = createContext<{
    images : imagesType[],
    setImages: React.Dispatch<React.SetStateAction<imagesType[]>>,
    selectedImage : imagesType | undefined,
    setSelectedImage : React.Dispatch<React.SetStateAction<imagesType | undefined>>
}>({
    images : [],
    selectedImage : undefined,
    setSelectedImage : ()=>{},
    setImages : ()=>{}
});

export const ImageUploadProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<imagesType[]>([])
    const [selectedImage, setSelectedImage] = useState<imagesType | undefined>(undefined)
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
