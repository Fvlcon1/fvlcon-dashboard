import { canvasTypes, checkedFaceType, FetchState } from "../@types";
import checkFace from "./checkface";
import { getAllFaces } from "./getallFaces";
import { getSingleFace } from "./getSingleFace";

const checkEachFace = async (distinctFaces : FetchState<canvasTypes[]>): Promise<((checkedFaceType | undefined)[] | undefined)> => {
    const allFaces = await getAllFaces()
    if(distinctFaces?.data){
        const results = await Promise.all(
            distinctFaces.data.map(async (item) => await runRecognitionOnSingleFace(item, allFaces))
        );
        return results;
    }
}

export const runRecognitionOnSingleFace = async (face : canvasTypes, allFaces? : any) : Promise<(checkedFaceType | undefined)> => {
    allFaces = allFaces || await getAllFaces()
    const {result : checkedFace, error} = await checkFace(face.dataUrl);
        if(error) return {
                originalImage: face.dataUrl
            }
        if (checkedFace.matched) {
            if(allFaces){
                const getFace = allFaces.filter((item : any, index : number) => item.ExternalImageId === checkedFace.matchedPerson)
                if(getFace){
                    const singleFace = await getSingleFace(getFace[0].FaceId)
                    return {
                        originalImage: face.dataUrl,
                        matchedImage : singleFace,
                        matchedPerson: checkedFace.matchedPerson,
                        similarity: checkedFace.similarity,
                    };
                }
                console.log({getFace})
            }
            return {
                originalImage: face.dataUrl,
                matchedPerson: checkedFace.matchedPerson,
                similarity: checkedFace.similarity,
            };
        } else {
            console.log("No matches found");
            return {
                originalImage: face.dataUrl
            }
        }
}

export default checkEachFace