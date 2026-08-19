import { Button } from "@mui/material"
import { Routes, Route, Navigate } from "react-router"
import { useAppThemeContext, useDrawerContext } from "../shared/contexts"

export const AppRoutes=()=>{

    const {toggleDrawerOpen}=useDrawerContext()
    return(
        <Routes>
            <Route path="/home" element={<Button onClick={toggleDrawerOpen} variant="contained" color="primary">Open Drawer</Button>}/>
            {/*O Navigate redireciona para a rota principal caso o usuário jogue uma rota aleatória não existente */}
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}