import axios from "axios";
import { CHECK_FACE_URL } from "../constants";

const checkFace = async (file : string) => {
    const base64data = file.split(",")[1];
    try {
      const response = await axios.post(CHECK_FACE_URL, {
        image: base64data,
      });
      console.log({response : response.data})
      return({result : response.data});
    } catch (error : any) {
        console.error("Error checking face:", error);
        return ({
            error : {
                message : "Failed to check face",
                details : error.response ? error.response.data.error : error.message
            },
        })
    }
};


export default checkFace