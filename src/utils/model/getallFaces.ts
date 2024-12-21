import axios from "axios";

export const getAllFaces = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}`);
      console.log("Fetched faces:", response.data);
      return (response.data);
    } catch (err) {
      console.error("Error fetching faces:", err);
    }
  };