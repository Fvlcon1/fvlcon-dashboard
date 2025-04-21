import { notFound } from "next/navigation";
import '../components/style.css'
import { getVideoLog } from "../utils/get-video-logs";
import PrintableFvlconizationResult from '../components/printableFvlconizationResult';
import { FvlconizationLogs, FvlconizationVideoLogs } from "@prisma/client";
import { getSingleFace } from "@/utils/model/getSingleFace";
import { getDateTime, getRelativeTime } from "@/utils/getDate";

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
  const log : FvlconizationVideoLogs = await getVideoLog(recordId)

  
  //Get accuracy from log
  const accuracy = log?.occurance?.flatMap((singleOccurance: any) =>
    singleOccurance.content
  )?.flatMap((item: any) =>
    item.FaceMatches
  )?.find((faceMatch: any) =>
    faceMatch.Face.FaceId === faceId
  )?.Face.Confidence;
  
  
//   const croppedImageUrl = (findMediaWidthFaceId as any)?.segmentedImageUrl
  const uploadedImageUrl = (log as any)?.uploadedImageUrl
  const type = (log as any)?.type
  const date = getDateTime((log as any)?.date)
  const timeElapsed = (log as any)?.timeElapsed
  const status = (log as any)?.status

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
          type, date, timeElapsed, status, accuracy
        }}
      />
    </div>
  )
}

export default Printable