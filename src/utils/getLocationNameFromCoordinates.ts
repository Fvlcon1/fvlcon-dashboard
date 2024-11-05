import axios from "axios"

const getLocationNameFromCordinates = async (coordinates : number[]) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
        params : {
            lat : coordinates[0],
            lon : coordinates[1],
            appid : '12d9154b1f1c1178b34d1b238de0b6f4'
        }
    })
    console.log({response})
    return response.data[0]
}

export default getLocationNameFromCordinates