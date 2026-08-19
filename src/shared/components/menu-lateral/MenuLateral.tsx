import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"

interface IThemeProviderProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IThemeProviderProps> = ({ children }) => {

    const theme = useTheme();

    return (
        <>
            <Drawer anchor="right" open={true} variant="permanent">
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
                marginLeft: theme.spacing(28),
                height: 100,
            }}>
                {children}
            </Box >
        </>
    )
}