import { notFound } from "next/navigation";
import '../components/style.css'
import { getVideoLog } from "../utils/get-video-logs";
import PrintableFvlconizationResult from '../components/printableFvlconizationResult';
import { FvlconizationLogs } from "@prisma/client";
import { getSingleFace } from "@/utils/model/getSingleFace";

const Printable = async (
  { 
    params, 
    searchParams
   }: { 
    params: { id: string }; 
    searchParams: { 
      faceId: string, 
      action: string
      filename? : string
    }
    }
) => {
  const recordId = params.id;
  const faceId = searchParams.faceId
  const action = searchParams.action
  const filename = searchParams.filename
  
  const niaDetail = await getSingleFace(faceId)
  const log : FvlconizationLogs = await getVideoLog(recordId)

  
  //gets Nia details of person with the provided faceId from the log
//   const findMediaWidthFaceId = log?.media?.find((item)=>(item as any)?.matchedFaceId===faceId)
  
//   const croppedImageUrl = (findMediaWidthFaceId as any)?.segmentedImageUrl
  const uploadedImageUrl = (log as any)?.uploadedImageUrl
  const type = (log as any)?.type
  const date = (log as any)?.date
  const timeElapsed = (log as any)?.timeElapsed
  const status = (log as any)?.status
//   const accuracy = (findMediaWidthFaceId as any)?.accuracy

  return (
    <div
      className="w-full max-w-[800px] bg-white rounded-t-lg mt-[20px]"
    >
      <PrintableFvlconizationResult 
        // croppedImageUrl={'croppedImageUrl'}
        // uploadedImageUrl={uploadedImageUrl}
        action={action}
        filename={filename}
        data={niaDetail}
        fvlconizationResultsDetails={{
          type, date, timeElapsed, status, accuracy : 0
        }}
      />
    </div>
  )
}

export default Printable