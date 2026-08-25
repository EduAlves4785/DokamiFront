import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router";

interface IThemeProviderProps {
    children: React.ReactNode;
}

interface IListItemLinkProp {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProp> = ({ ...prev }) => {

    const navigate = useNavigate()

    const resolvedPath = useResolvedPath(prev.to);

    //Saber pela url qual rota está selecionada
    const match = useMatch({ path: resolvedPath.pathname, end: false })

    const handleClick = () => {
        navigate(prev.to)
        //Testa se a função é undefined
        prev.onClick?.()
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{prev.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={prev.label} />
        </ListItemButton>
    )
}

export const MenuLateral: React.FC<IThemeProviderProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
    const { toggleTheme } = useAppThemeContext()

    return (
        <>
            <Drawer anchor="left" open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box sx={{
                    width: theme.spacing(28),
                    height: "100%",
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: theme.spacing(20),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <Avatar sx={{
                            width: theme.spacing(12),
                            height: theme.spacing(12)
                        }} />
                    </Box>

                    <Divider />
                    <Box sx={{ flex: 1 }}>
                        <List component="nav">
                            {drawerOptions.map((drawerOption) => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    label={drawerOption.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined} />
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>
                                <Icon>dark_mode</Icon>
                            </ListItemIcon>
                            <ListItemText primary='Alternar tema' />
                        </ListItemButton>
                    </Box>

                </Box>
            </Drawer>
            <Box sx={{
                marginLeft: smDown ? 0 : theme.spacing(28),
                height: 100,
            }}>
                {children}
            </Box >
        </>
    )
}