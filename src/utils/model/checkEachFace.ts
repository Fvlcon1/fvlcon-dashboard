import { canvasTypes, checkedFaceType, FetchState } from "../@types";
import checkFace from "./checkface";
import { getAllFaces } from "./getallFaces";
import { getSingleFace } from "./getSingleFace";

const checkEachFace = async (distinctFaces : FetchState<canvasTypes[]>): Promise<((checkedFaceType | undefined)[] | undefined)> => {
    const allFaces = await getAllFaces()
    if(distinctFaces?.data){
        const results = await Promise.all(
            distinctFaces.data.map(async (item) => {
                const {result : checkedFace, error} = await checkFace(item.dataUrl);
                if(error) return {
                        originalImage: item.dataUrl
                    }
                if (checkedFace.matched) {
                    if(allFaces){
                        const getFace = allFaces.filter((item : any, index : number) => item.ExternalImageId === checkedFace.matchedPerson)
                        if(getFace){
                            const singleFace = await getSingleFace(getFace[0].FaceId)
                            return {
                                originalImage: item.dataUrl,
                                matchedImage : singleFace,
                                matchedPerson: checkedFace.matchedPerson,
                                similarity: checkedFace.similarity,
                            };
                        }
                        console.log({getFace})
                    }
                    return {
                        originalImage: item.dataUrl,
                        matchedPerson: checkedFace.matchedPerson,
                        similarity: checkedFace.similarity,
                    };
                } else {
                    console.log("No matches found");
                    return {
                        originalImage: item.dataUrl
                    }
                }
            })
        );
        return results;
    }
}

export default checkEachFace