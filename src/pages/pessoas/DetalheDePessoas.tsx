import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentaDeDetalhes } from "../../shared/components"
import { useEffect, useState } from "react"
import { IDetalhePessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, LinearProgress, TextField, Typography } from "@mui/material"
import { Formik, useFormik } from "formik"
import { formScheme, formValidationSchema } from "./formSchemePessoa"

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    const formik = useFormik<IDetalhePessoa>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationSchema
    })

    async function handleSubmit(dados: IDetalhePessoa) {
        console.log('Pessoa: ' + dados)
    }

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
            <Box
                component="form"
                onSubmit={handleSave}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 400,
                    mx: "auto",
                    mt: 4,
                }}
            >
                <Typography variant="h5">
                    Cadastro de usuário
                </Typography>
                <Box>
                    <TextField id="nomeUsuario" label="Nome" variant="outlined" />
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                        variant="standard"
                    />
                </Box>



                <Button
                    type="submit"
                    variant="contained"
                >
                    Cadastrar
                </Button>
            </Box>
        </LayoutBaseDePagina>
    )
}