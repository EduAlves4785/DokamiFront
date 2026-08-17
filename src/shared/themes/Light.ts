import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#7C3AED',
            dark: '#5B21B6',
            light: '#A855F7',
            contrastText: '#FFFFFF',
        },

        secondary: {
            main: '#8B5CF6',
            dark: '#6D28D9',
            light: '#C4B5FD',
            contrastText: '#FFFFFF',
        },

        background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
        }
    }
});