import { useSearchParams } from "react-router-dom"
import { FerramentaDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo } from "react"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"


export const ListagemDePessoas: React.FC = () => {

    //useSearchParams é um hook do react-router-dom que permite acessar e manipular os parâmetros de consulta (query parameters) da URL. 
    // Ele retorna um array com dois elementos: o primeiro é um objeto que representa os parâmetros de consulta atuais, e o segundo é uma função que permite atualizar esses parâmetros.
    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce(3000, false)

    //useMemo é um hook do React que memoriza o valor retornado por uma função, evitando que ela seja recalculada em cada renderização, a menos que suas dependências mudem.
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])

    //
    useEffect(() => {
        debounce(() => {
            PessoasService.getAll(1, busca)
                .then((result) => {
                   if(result instanceof Error){
                    alert(result.message)
                   }else{
                    console.log(result)
                   }
                })

        })


    }, [busca])

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerramentaDaListagem
                textoBotaoNovo="Nova pessoa"
                mostrarInput
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })} />}
            children='a' />
    )
}