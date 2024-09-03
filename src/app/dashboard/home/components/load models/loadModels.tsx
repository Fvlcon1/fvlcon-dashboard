'use client'

import { isModelsLoaded, loadModels } from "@/utils/segmentFaces"
import BottomBackgroundLoader from "@components/loaders/bottomBackgroundLoader"
import { useEffect, useState } from "react"

const LoadModels = () => {
    const [localIsModelsLoaded, setLocalIsModelsLoaded] = useState(isModelsLoaded())

    const loadAIModels = async () => {
        const models = await loadModels()
        if(models)
            setLocalIsModelsLoaded(true)
    }

    useEffect(()=>{
        if(!localIsModelsLoaded)
            loadAIModels()
    },[])
    return (
        !localIsModelsLoaded &&
        <BottomBackgroundLoader
            title="Loading Models"
        />
    )
}

export default LoadModels