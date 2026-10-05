import { useSearchParams } from "react-router-dom"
import { FerramentaDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react"
import { PessoasService, IListagemPessoa } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { Environment } from "../../shared/environment"


export const ListagemDePessoas: React.FC = () => {

    //useSearchParams é um hook do react-router-dom que permite acessar e manipular os parâmetros de consulta (query parameters) da URL. 
    // Ele retorna um array com dois elementos: o primeiro é um objeto que representa os parâmetros de consulta atuais, e o segundo é uma função que permite atualizar esses parâmetros.
    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce()

    const [rows, setRows] = useState<IListagemPessoa[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    //useMemo é um hook do React que memoriza o valor retornado por uma função, evitando que ela seja recalculada em cada renderização, a menos que suas dependências mudem.
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams])

    //
    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        console.log(result)
                        setTotalCount(result.totalCount)
                        setRows(result.data)
                    }
                })

        })


    }, [busca, pagina])

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerramentaDaListagem
                textoBotaoNovo="Nova pessoa"
                mostrarInput
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina:'1' }, { replace: true })} />}>
            <TableContainer component={Paper} variant="outlined" sx={{
                m: 1,
                width: 'auto'
            }}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell >Nome</TableCell>
                            <TableCell >Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {totalCount===0 && !isLoading && (
                        <caption >{Environment.LISTAGEM_VAZIA}</caption>
                    )}
                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                         {(totalCount>0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination 
                                    page={pagina}
                                    count={Math.ceil(totalCount/Environment.LIMITE_DE_LINHAS)}
                                    onChange={(_,newPage)=>setSearchParams({busca, pagina: newPage.toString() },{replace:true})}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>

    )
}