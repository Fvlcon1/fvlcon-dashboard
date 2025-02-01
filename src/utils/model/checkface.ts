import axios from "axios";

const checkFace = async (file : string) => {
    const base64data = file.split(",")[1];
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/faces/check`, {
        image: base64data,
      });
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