import axios from "axios";

export const getSingleFace = async (faceId : string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/faces/${faceId}`);
      if (response.data && response.data.imageUrl) {
        console.log(response.data)
        return (response.data);
      } else {
        console.log("No image URL received");
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };