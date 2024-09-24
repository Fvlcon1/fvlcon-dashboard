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
            const matchedImage = await getSingleFace(checkedFace.matchedFaceId)
            return {
                originalImage: face.dataUrl,
                matchedImage : matchedImage.imageUrl,
                matchedPerson: checkedFace.details.PersonName,
                similarity: checkedFace.similarity,
                details : {
                    Address : matchedImage.Address,
                    Citizenship : matchedImage.Citizenship,
                    CriminalRecord : matchedImage.CriminalRecord,
                    DateOfBirth : matchedImage.DateOfBirth,
                    DigitalAddress : matchedImage.DigitalAddress,
                    ExternalImageId : matchedImage.ExternalImageId,
                    FaceId : matchedImage.FaceId,
                    FirstName : matchedImage.FirstName,
                    HasCriminalRecord : matchedImage.HasCriminalRecord,
                    LastName : matchedImage.LastName,
                    MiddleName : matchedImage.MiddleName,
                    PersonId : matchedImage.PersonId,
                    PersonName : matchedImage.PersonName,
                    PlaceOfBirth : matchedImage.PlaceOfBirth,
                    S3Key : matchedImage.S3Key,
                    imageUrl : matchedImage.imageUrl
                }
            };
        } else {
            console.log("No matches found");
            return {
                originalImage: face.dataUrl
            }
        }
}

export default checkEachFace