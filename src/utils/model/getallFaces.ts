import axios from "axios";
import { API_URL } from "../constants";

export const getAllFaces = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched faces:", response.data);
      return (response.data);
    } catch (err) {
      console.error("Error fetching faces:", err);
    }
  };