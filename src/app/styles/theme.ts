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
    bgLight : {
        primary : '#F4F4F4',
        secondary : '#EBEBEB',
        tetiary : '#D0D0D0',
    },
    textLight : {
        primary : '#0A2540',
        secondary : '#425466',
        tetiary : '#8E98A3',
    },
    main : {
        primary : '#339D8F'
    }
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
    textLight : {
        primary : 'var(--text-light-primary)',
        secondary : 'var(--text-light-secondary)',
        tetiary : 'var(--text-light-tetiary)',
    },
    bgLight : {
        primary : 'var(--bg-light-primary)',
        secondary : 'var(--bg-light-secondary)',
        tetiary : 'var(--bg-light-tetiary)',
    },
    main : {
        primary : 'var(--main-primary)'
    }
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