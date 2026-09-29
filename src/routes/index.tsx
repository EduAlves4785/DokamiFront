import { Routes, Route } from "react-router"
import { useDrawerContext } from "../shared/contexts"
import { useEffect } from "react"
import { Dashboard, ListagemDePessoas } from "../pages"

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext()

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página inicial',
                icon: 'home',
                path: 'home'
            },
             {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            }
        ])
    }, [])

    return (
        <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/pessoas" element={<ListagemDePessoas />} />
            {/*O Navigate redireciona para a rota principal caso o usuário jogue uma rota aleatória não existente */}
            {/*<Route path="*" element={<Navigate to="/home"/>}/> */}
        </Routes>
    )
}