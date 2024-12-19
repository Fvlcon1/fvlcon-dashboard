'use client'

import { canvasTypes, checkedFaceType, FetchState, logsType, occurance } from "@/utils/@types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export const HomeContext = createContext<{
  displayMatches: boolean
  setDisplayMatches: Dispatch<SetStateAction<boolean>>
  displayFaces: boolean
  setDisplayFaces: Dispatch<SetStateAction<boolean>>
  fvlconizing: boolean
  setFvlconizing: Dispatch<SetStateAction<boolean>>
  fileExtension: string | undefined
  setFileExtension: Dispatch<SetStateAction<string | undefined>>
  imageSrc: string | undefined
  videoSrc: string | undefined
  setVideoSrc: Dispatch<SetStateAction<string | undefined>>
  setImageSrc: Dispatch<SetStateAction<string | undefined>>
  videoTimestamp: number
  setVideoTimestamp: Dispatch<SetStateAction<number>>
  seekVideoTimestamp: number
  setSeekVideoTimestamp: Dispatch<SetStateAction<number>>
  distinctFaces: FetchState<canvasTypes[]>
  setDistinctFaces: Dispatch<SetStateAction<FetchState<canvasTypes[]>>>
  matchedFaces: FetchState<checkedFaceType[]>
  setMatchedFaces: Dispatch<SetStateAction<FetchState<checkedFaceType[]>>>
  logs: logsType[]
  setLogs: Dispatch<SetStateAction<logsType[]>>
  setOccurance : Dispatch<SetStateAction<occurance | undefined>>
  occurance : occurance | undefined
  timer : number
  setTimer : Dispatch<SetStateAction<number>>
}>({
  displayMatches: false,
  setDisplayMatches: ()=>{},
  displayFaces: false,
  setDisplayFaces: ()=>{},
  fvlconizing: false,
  setFvlconizing: ()=>{},
  fileExtension: '',
  setVideoSrc: ()=>{},
  videoSrc: '',
  setFileExtension: ()=>{},
  imageSrc: '',
  setImageSrc: ()=>{},
  videoTimestamp: 0,
  setVideoTimestamp: ()=>{},
  seekVideoTimestamp: 0,
  setSeekVideoTimestamp: ()=>{},
  distinctFaces : {},
  setDistinctFaces : ()=>{},
  matchedFaces : {},
  setMatchedFaces : ()=>{},
  logs : [],
  setLogs : ()=>{},
  setOccurance : ()=>{},
  occurance : undefined,
  timer : 0,
  setTimer : ()=>{}
});

export const HomeContextProvider = ({ 
    children
 } : {
    children : ReactNode
 }) => {
  const [displayMatches, setDisplayMatches] = useState(false)
  const [displayFaces, setDisplayFaces] = useState(false)
  const [fvlconizing, setFvlconizing] = useState(false)
  const [fileExtension, setFileExtension] = useState<string>()
  const [imageSrc, setImageSrc] = useState<string>()
  const [videoSrc, setVideoSrc] = useState<string>()
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0)
  const [seekVideoTimestamp, setSeekVideoTimestamp] = useState<number>(0)
  const [occurance, setOccurance] = useState<occurance>()
  const [timer, setTimer] = useState(0)
  const [distinctFaces, setDistinctFaces] = useState<FetchState<canvasTypes[]>>({
    isEmpty : false,
    isLoading : false,
  })
  const [matchedFaces, setMatchedFaces] = useState<FetchState<checkedFaceType[]>>({
      isEmpty : false,
      isLoading : false
  })
  const [logs, setLogs] = useState<logsType[]>([])
  
  return (
    <HomeContext.Provider 
      value={{
        displayMatches,
        timer,
        setTimer,
        logs,
        occurance,
        setOccurance,
        setLogs,
        setDisplayMatches,
        displayFaces,
        setDisplayFaces,
        fvlconizing,
        setFvlconizing,
        fileExtension,
        setFileExtension,
        imageSrc,
        setImageSrc,
        videoSrc,
        setVideoSrc,
        videoTimestamp,
        setVideoTimestamp,
        seekVideoTimestamp,
        setSeekVideoTimestamp,
        distinctFaces,
        setDistinctFaces,
        matchedFaces,
        setMatchedFaces
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}