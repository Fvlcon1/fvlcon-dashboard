import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
    text : {
        primary : '#F6F6F8',
        secondary : '#77767B',
        tetiary : '#555458',
    },
    bg : {
        primary : '#000000',
        secondary : '#111111',
        tetiary : '#141414',
        quantinary : '#1C1C1E',
        alt1 : '#2C2C2C',
        alt2 : '#474747'
    },
}

export const cssColors = {
    text : {
        primary : 'var(--text-primary)',
        secondary : 'var(--text-secondary)',
        tetiary : 'var(--text-tetiary)',
    },
    bg : {
        primary : 'var(--bg-primary)',
        secondary : 'var(--bg-secondary)',
        tetiary : 'var(--bg-tetiary)',
        quantinary : 'var(--bg-quantinary)',
        alt1 : 'var(--bg-alt1)',
    },
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