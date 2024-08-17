import axios from "axios";
import { API_URL } from "../constants";

export const getSingleFace = async (faceId : string) => {
    try {
      const response = await axios.get(`${API_URL}/${faceId}`);
      if (response.data && response.data.imageUrl) {
        console.log(response.data.imageUrl)
        return (response.data.imageUrl);
      } else {
        console.log("No image URL received");
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };