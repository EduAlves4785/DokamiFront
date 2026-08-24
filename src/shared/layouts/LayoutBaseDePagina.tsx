import { Height } from "@mui/icons-material";
import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../contexts";
import { ReactNode } from "react";


interface ILayoutBaseDePagina {
    children: ReactNode;
    titulo: string
    barraDeFerramentas: ReactNode

}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePagina> = ({ children, ...prev }) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext()

    return (
        <Box sx={{
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
        }}>

            <Box sx={{
                p: 1,
                height: theme.spacing(smDown?6:mdDown?8:12),
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                {smDown && (<IconButton onClick={toggleDrawerOpen}>
                    <Icon>menu</Icon>
                </IconButton>)}
                <Typography variant={smDown?"h5":mdDown?'h4':'h3'} sx={{
                    whiteSpace:'nowrap',
                    overflow:'hidden',
                    textOverflow:'ellipsis'
                }}>
                    {prev.titulo}
                </Typography>
            </Box>
            {prev.barraDeFerramentas && (
                <Box>
                    {prev.barraDeFerramentas}
                </Box>
            )}
            <Box sx={{
                flex:1,
                overflow:'auto'
            }}>
                {children}
            </Box>
        </Box>

    )
}