import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material"

interface IFerramentaDeDetalhesProps {
    textoBotaoNovo?: String
    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean
    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEFechar?: () => void
}

export const FerramentaDeDetalhes: React.FC<IFerramentaDeDetalhesProps> = ({ 
    textoBotaoNovo = 'Novo', mostrarBotaoNovo = true, mostrarBotaoVoltar = true, mostrarBotaoApagar = true, mostrarBotaoSalvar = true, mostrarBotaoSalvarEFechar = false, aoClicarEmNovo, aoClicarEmVoltar, aoClicarEmApagar, aoClicarEmSalvar, aoClicarEmSalvarEFechar }) => {



    const theme = useTheme()

    return (
        <Box component={Paper} sx={{
            height: theme.spacing(5),
            margin: 1,
            padding: 1,
            px: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}>
           {mostrarBotaoSalvar && <Button onClick={aoClicarEmSalvar} variant="contained" color="primary" disableElevation startIcon={<Icon>save</Icon>}>Salvar</Button>}
            {mostrarBotaoSalvarEFechar && <Button onClick={aoClicarEmSalvarEFechar} variant="outlined" color="primary" disableElevation startIcon={<Icon>save</Icon>}>Salvar e voltar</Button>}
            {mostrarBotaoApagar && <Button onClick={aoClicarEmApagar} variant="outlined" color="primary" disableElevation startIcon={<Icon>delete</Icon>}>Apagar</Button>}
            {mostrarBotaoNovo && <Button onClick={aoClicarEmNovo} variant="outlined" color="primary" disableElevation startIcon={<Icon>add</Icon>}>{textoBotaoNovo}</Button>}
            {mostrarBotaoVoltar && <Divider variant="middle" orientation="vertical" />}
            {mostrarBotaoVoltar && <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>arrow_back</Icon>}>Voltar</Button>}
        </Box>

    )
}