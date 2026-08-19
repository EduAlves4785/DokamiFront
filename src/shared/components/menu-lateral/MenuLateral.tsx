import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../../contexts";

interface IThemeProviderProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IThemeProviderProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen} =useDrawerContext()

    return (
        <>
            <Drawer anchor="right" open={isDrawerOpen} variant={smDown?'temporary':'permanent'} onClose={toggleDrawerOpen}>
                <Box sx={{
                    width: theme.spacing(28),
                    height:"100%",
                    display:'flex',
                    flexDirection:'column'
                }}>
                <Box sx={{
                    width:'100%',
                    height:theme.spacing(20),
                    display:"flex",
                    alignItems:"center",
                    justifyContent:'center'
                }}>
                    <Avatar sx={{
                        width:theme.spacing(12),
                        height:theme.spacing(12)
                    }} />
                </Box>

                <Divider/>
                <Box sx={{flex:1}}>
                    <List component="nav">
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon> home </Icon>
                            </ListItemIcon>
                            <ListItemText primary="Página inicial"/>
                        </ListItemButton>
                    </List>
                </Box>

                </Box>
            </Drawer>
            <Box sx={{
                marginLeft: smDown?0:theme.spacing(28),
                height: 100,
            }}>
                {children}
            </Box >
        </>
    )
}