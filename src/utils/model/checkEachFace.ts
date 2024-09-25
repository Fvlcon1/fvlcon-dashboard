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
            const details = await getSingleFace(checkedFace.matchedFaceId)
            return {
                originalImage: face.dataUrl,
                matchedImage : details.imageUrl,
                matchedPerson: checkedFace.details.PersonName,
                similarity: checkedFace.similarity,
                details : {
                    Address : details.Address,
                    Citizenship : details.Citizenship,
                    CriminalRecord : details.CriminalRecord,
                    DateOfBirth : details.DateOfBirth,
                    DigitalAddress : details.DigitalAddress,
                    ExternalImageId : details.ExternalImageId,
                    FaceId : details.FaceId,
                    FirstName : details.FirstName,
                    HasCriminalRecord : details.HasCriminalRecord,
                    LastName : details.LastName,
                    MiddleName : details.MiddleName,
                    PersonId : details.PersonId,
                    PersonName : details.PersonName,
                    PlaceOfBirth : details.PlaceOfBirth,
                    S3Key : details.S3Key,
                    imageUrl : details.imageUrl
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