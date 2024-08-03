import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
    darkGray : '#24232C',
    gray : '#817D92',
    almostWhite : '#E6E5EA',
    veryDarkGray : '#18171F',
    neonGreen : '#A4FFAF',
    red : '#F64A4A',
    orange : '#FB7C58',
    yellow : '#F8CD65',
    bg : "#08070B"
}

export const theme = {
    colors : {
        ...colors
    },

    typography: {
        size: { 
            body: TypographySize.body,
            HL: TypographySize.HL,
            HM: TypographySize.HM,
        },
        bold: { sm: TypographyBold.sm, md: TypographyBold.md, lg: TypographyBold.lg },
      },
}

export default theme