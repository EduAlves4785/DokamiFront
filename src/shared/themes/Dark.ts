import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
    palette: {
        mode:'dark',
        primary: {
            main: '#8B5CF6',
            dark: '#7C3AED',
            light: '#A78BFA',
            contrastText: '#FFFFFF',
        },

        secondary: {
            main: '#A855F7',
            dark: '#7E22CE',
            light: '#C084FC',
            contrastText: '#FFFFFF',
        },

        background: {
            default: '#0F172A',
            paper: '#1E293B',
        }
    },
    typography:{
        allVariants:{
            color:'white',
            
        }
    }
});