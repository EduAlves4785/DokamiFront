import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentaDeDetalhes } from "../../shared/components"
import { useEffect, useState } from "react"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { LinearProgress } from "@mui/material"

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)
            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/pessoas')
                    } else {
                        setNome(result.nomeCompleto)
                        console.log(result)
                    }
                })
        }
    }, [id])

    const handleSave = () => {
        console.log('Salvar')
    }

    const handleDelete = (id: number) => {
        //Confirm é uma função nativa do JavaScript que exibe uma caixa de diálogo de confirmação para o usuário. Ela retorna true se o usuário clicar em "OK" e false se clicar em "Cancelar".
        if (window.confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                })
        } else {
            alert('Registro apago com sucesso!')
            navigate('/pessoas')
        }
    }

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentaDeDetalhes
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={() => handleSave()}
                    aoClicarEmSalvarEFechar={() => console.log('Salvar e fechar')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }>
            {isLoading && (
                <LinearProgress variant="indeterminate" />
            )}
            <p>Detalhe de pessoas {id}</p>
        </LayoutBaseDePagina>
    )
}