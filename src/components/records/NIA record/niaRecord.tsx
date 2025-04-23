'use client'

import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { getPersonDetails } from "./niaDataSections"
import NiaRecordSections from "./sections/NiaRecordSections"
import DownloadPrintActions from "./sections/DownloadPrintActions"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"
import { componentToPdfDownload } from "@/utils/componentToPdfDownload"
import NiaDownloadableRecord from "./niaDownloadableRecord"
import { HomeContext } from "@/app/dashboard/home/context/homeContext"
import Modal from "@components/modal/modal"
import Input from "@components/input/input"
import { useDownloadAndPrint } from "./hooks/useDownloadAndPrint"

const NiaRecord = ({
    visible,
    setVisible,
    data,
    faceId,
    croppedImage,
    boundedImage
} : {
    visible : boolean,
    setVisible : React.Dispatch<React.SetStateAction<boolean>>
    data? : any,
    faceId? : string
    croppedImage : string
    boundedImage : string
}) => {
    const [zoom, setZoom] = useState(false)
    const [zoomImage, setZoomImage] = useState('')
    const { personDetails : personDetes } = data ?? {}
    const personDetails = getPersonDetails(personDetes);

    const statelessFilename = `${personDetails[1][1]}${personDetails[0][1]}${(new Date()).toISOString()}`
    
    const [showDownloadableComponent, setShowDownloadableComponent] = useState(false);
    const [showDownloadableComponentToPrint, setShowDownloadableComponentToPrint] = useState(false);
    const { FvlconizationlogId, fvlconizedContentType } = useContext(HomeContext)
    const refobj = useRef<HTMLDivElement>(null);
    const [showFilenameContainer, setShowFilenameContainer] = useState(false)
    const [filename, setFilename] = useState(statelessFilename)

    const {
        handlePdfDownload,
        getPrintableLink,
        handlePrint,
        downloadPdf,
        reactToPrintFn,
    } = useDownloadAndPrint({
        refobj,
        statelessFilename,
        fvlconizedContentType,
        FvlconizationlogId,
        faceId,
        showDownloadableComponent,
        setShowDownloadableComponent,
        showDownloadableComponentToPrint,
        setShowDownloadableComponentToPrint,
        setFilename,
        componentToPdfDownload,
    });
    
    return (
        <OverlayWindow
            title="NIA record, Ghana"
            display={visible}
            setDisplay={setVisible}
            windowStyle="!h-[90%] !w-[40%] !min-w-[700px]"
            icons={[
                <DownloadPrintActions
                    key="download-print-actions"
                    setShowFilenameContainer={setShowFilenameContainer}
                    getPrintableLink={getPrintableLink}
                    theme={theme}
                />
            ]}
        >
            {
                <Modal 
                    display={showFilenameContainer}
                    setDisplay={setShowFilenameContainer}
                    onOkayClick={handlePdfDownload}
                    onCancel={()=>setFilename(statelessFilename)}
                    okayButtonText="Download"
                    title="Enter filename"
                >
                    <Input 
                        content={filename}
                        setContent={setFilename}
                        className="!rounded-md"
                        placeholder={`${personDetails[1][1]}${personDetails[0][1]}${(new Date()).toISOString()}`}
                        autofocus
                        required
                        autoSelect
                    />
                </Modal>
            }
            {(showDownloadableComponent || showDownloadableComponentToPrint) &&
                <NiaDownloadableRecord 
                    ref={refobj} 
                    data={data}
                    croppedImage={croppedImage}
                    boundedImage={boundedImage}
                />
            }
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImage} 
            />
            <div className="fixed top-0 left-0 w-full flex h-full justify-center items-center opacity-[0.02] pointer-events-none">
                <div className="h-[600px] w-[700px] z-10 relative">
                    <Image
                        alt="img"
                        fill
                        className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                        src={require('@/assets/dev/coagh.png')}
                        onClick={()=>setZoom(prev => !prev)}
                    />
                </div>
            </div>
            {
                data &&
                <NiaRecordSections data={data}/>
            }
        </OverlayWindow>
    )
}
export default NiaRecord