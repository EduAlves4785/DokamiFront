import { Button } from "@mui/material"
import { Routes, Route, Navigate } from "react-router"
import { useAppThemeContext } from "../shared/contexts"

export const AppRoutes=()=>{

    const {toggleTheme}=useAppThemeContext()
    return(
        <Routes>
            <Route path="/home" element={<Button onClick={toggleTheme} variant="contained" color="primary">Test</Button>}/>
            {/*O Navigate redireciona para a rota principal caso o usuário jogue uma rota aleatória não existente */}
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}