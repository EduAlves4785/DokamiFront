import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"
//Import interno
import { Environment } from "../../environment";

interface IFerramentaDaListagemProps {
    textoDaBusca?: string;
    mostrarInput?: boolean
    aoMudarTextoDeBusca?: (novoTexto: string) => void
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean
    aoClicarEmNovo?: () => void
}

export const FerramentaDaListagem: React.FC<IFerramentaDaListagemProps> = ({
    textoDaBusca = '', mostrarInput = false, aoMudarTextoDeBusca, textoBotaoNovo = 'Novo', mostrarBotaoNovo = true, aoClicarEmNovo
}) => {

    const theme = useTheme()

    return (
        <Box component={Paper} sx={{
            height: theme.spacing(5),
            margin: 1,
            padding: 1,
            px: 1,
            display: 'flex',
            alignItems: 'center'
        }}>
            {mostrarInput && (
                <TextField size="small" placeholder={Environment.INPUT_DE_BUSCA} value={textoDaBusca} onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)} />
            )}
            <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: "end"
            }}>
                {mostrarBotaoNovo&&(
                    <Button variant="contained" onClick={aoClicarEmNovo} color="primary" disableElevation endIcon={<Icon>add</Icon>}>{textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    )
}