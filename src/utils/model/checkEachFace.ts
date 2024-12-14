import { canvasTypes, checkedFaceType, FetchState } from "../@types";
import checkFace from "./checkface";
import { getAllFaces } from "./getallFaces";
import { getSingleFace } from "./getSingleFace";

const checkEachFace = async (distinctFaces : FetchState<canvasTypes[]>): Promise<((checkedFaceType | undefined)[] | undefined)> => {
    if(distinctFaces?.data){
        const results = await Promise.all(
            distinctFaces.data.map(async (item) => await runRecognitionOnSingleFace(item))
        );
        return results;
    }
}

export const runRecognitionOnSingleFace = async (face : canvasTypes) : Promise<(checkedFaceType | undefined)> => {
    const {result : checkedFace, error} = await checkFace(face.dataUrl);
        if(error) return {
                originalImage: face.dataUrl
            }
        if (checkedFace.matched) {
            const details = checkedFace.details
            return {
                originalImage: face.dataUrl,
                matchedImage : details.imageUrl,
                similarity: checkedFace.similarity,
                details
            };
        } else {
            console.log("No matches found");
            return {
                originalImage: face.dataUrl
            }
        }
}

export default checkEachFace