import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentaDeDetalhes } from "../../shared/components"
import { useEffect, useState } from "react"
import { IDetalhePessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, LinearProgress, TextField, Typography } from "@mui/material"
import { Formik, useFormik } from "formik"
import { formScheme, formValidationSchema } from "./formSchemePessoa"
import { red } from "@mui/material/colors"
import { error } from "console"

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    const handleSave = () => {
        console.log('Salvar')
    }

    async function handleSubmit(dados: IDetalhePessoa) {
        console.log('Pessoa: ' + dados)
    }

    const formik = useFormik<IDetalhePessoa>({
        initialValues: formScheme,
        //onSubmit: handleSubmit,
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            console.log("SUBMIT FUNCIONOU!", values);
            alert("Formulário enviado!");
        }
    })

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
                onSubmit={formik.handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 400,
                }}
            >
                <TextField
                    name="nomeCompleto"
                    label="Nome completo"
                    value={formik.values.nomeCompleto}
                    onChange={formik.handleChange}
                />

                <TextField
                    name="email"
                    label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                <TextField
                    name="cidadeId"
                    label="Cidade ID"
                    value={formik.values.cidadeId}
                    onChange={formik.handleChange}
                />

                <Button type="submit" variant="contained">
                    Cadastrar
                </Button>
            </Box>

        </LayoutBaseDePagina>
    )
}