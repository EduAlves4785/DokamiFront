import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material"

interface IFerramentaDeDetalhesProps {
    textoBotaoNovo?: String

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEFecharCarregando?: boolean

    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEFechar?: () => void
}

export const FerramentaDeDetalhes: React.FC<IFerramentaDeDetalhesProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar }) => {

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
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && <Button onClick={aoClicarEmSalvar} variant="contained" color="primary" disableElevation startIcon={<Icon>save</Icon>}>Salvar</Button>}
            {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}
            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && <Button onClick={aoClicarEmSalvarEFechar} variant="outlined" color="primary" disableElevation startIcon={<Icon>save</Icon>}>Salvar e fechar</Button>}
            {mostrarBotaoSalvarEFecharCarregando && <Skeleton width={110} height={60} />}
            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && <Button onClick={aoClicarEmApagar} variant="outlined" color="primary" disableElevation startIcon={<Icon>delete</Icon>}>Apagar</Button>}
            {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}
            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && <Button onClick={aoClicarEmNovo} variant="outlined" color="primary" disableElevation startIcon={<Icon>add</Icon>}>{textoBotaoNovo}</Button>}
            {mostrarBotaoNovoCarregando && <Skeleton width={110} height={60} />}
            {mostrarBotaoVoltar && <Divider variant="middle" orientation="vertical" />}
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>arrow_back</Icon>}>Voltar</Button>}
            {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
        </Box>

    )
}