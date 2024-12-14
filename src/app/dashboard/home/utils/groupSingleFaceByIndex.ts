import { fvlconizedFaceType } from "@/utils/@types"

export const groupSingleFaceByIndex = (
    face : fvlconizedFaceType,
    facesGroupedByIndex: {
        index: number;
        content: fvlconizedFaceType[];
    }[]
) => {
    let isIndexed = false
    facesGroupedByIndex = facesGroupedByIndex.map((item) => {
        if(item.index === face.Person.Index){
            isIndexed = true
            return {
                index : item.index,
                content : [...item.content, face]
            }
        } else {
            return item
        }
    })
    if(!isIndexed){
        facesGroupedByIndex.push({
            index : face.Person.Index,
            content : [face]
        })
    }
    console.log({facesGroupedByIndex})
}