import { Routes, Route } from "react-router"
import { useDrawerContext } from "../shared/contexts"
import { useEffect } from "react"
import { Dashboard, ListagemDeCidade } from "../pages"

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
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            }
        ])
    }, [])

    return (
        <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/cidades" element={<ListagemDeCidade />} />
            {/*O Navigate redireciona para a rota principal caso o usuário jogue uma rota aleatória não existente */}
            {/*<Route path="*" element={<Navigate to="/home"/>}/> */}
        </Routes>
    )
}