import { checkedFaceType, FetchState } from "../@types";
import { FaceCanvasType } from "../getFaceCanvas";
import checkFace from "./checkface";

const checkEachFace = async (distinctFaces : FetchState<FaceCanvasType[]>): Promise<((checkedFaceType | undefined)[] | undefined)> => {
    if(distinctFaces?.data){
        const results = await Promise.all(
            distinctFaces.data.map(async (item) => await runRecognitionOnSingleFace(item))
        );
        return results;
    }
}

export const runRecognitionOnSingleFace = async (face : FaceCanvasType) : Promise<(checkedFaceType | undefined)> => {
    const {result : checkedFace, error} = await checkFace(face.croppedImage);
        if(error) return {
                croppedImage: face.croppedImage,
                boundedImage : face.boundedImage
            }
        if (checkedFace.matched) {
            const details = checkedFace.details
            return {
                croppedImage: face.croppedImage,
                boundedImage : face.boundedImage,
                matchedImage : details.imageUrl,
                similarity: checkedFace.similarity,
                details
            };
        } else {
            console.log("No matches found");
            return {
                croppedImage: face.croppedImage,
                boundedImage : face.boundedImage
            }
        }
}

export default checkEachFace