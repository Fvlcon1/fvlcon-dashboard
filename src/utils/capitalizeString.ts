/**
 * Converts the first letter of a each word in a string to a capital letter
 * @param string The string to capitalize
 * @returns 
 */
export const capitalizeString = (string : string) => {
    if(typeof string !== "string")
        return string
    return string
      ?.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  