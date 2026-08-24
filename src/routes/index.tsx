import { Routes, Route } from "react-router"
import { useDrawerContext } from "../shared/contexts"
import { useEffect } from "react"
import { Dashboard } from "../pages"

export const AppRoutes=()=>{

    const {setDrawerOptions}=useDrawerContext()

    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página inicial',
                icon:'home',
                path:'home'
            }
        ])
    },[])

    return(
        <Routes>
            <Route path="/home" element={<Dashboard/>}/>
            {/*O Navigate redireciona para a rota principal caso o usuário jogue uma rota aleatória não existente */}
            {/*<Route path="*" element={<Navigate to="/home"/>}/> */}
        </Routes>
    )
}