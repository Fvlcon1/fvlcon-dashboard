export const formatString = (str: string): string => {
    // Handle camelCase and PascalCase by adding spaces before capital letters
    let formattedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  
    // Handle snake_case by replacing underscores with spaces
    formattedStr = formattedStr.replace(/_/g, " ");
  
    // Capitalize the first letter of each word
    formattedStr = formattedStr
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  
    return formattedStr;
  }     