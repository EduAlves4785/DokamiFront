import { FerramentaDaListagem, FerramentaDeDetalhes } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard=()=>{
    return(
       <LayoutBaseDePagina 
        titulo="Página inicial" barraDeFerramentas={(
            <FerramentaDeDetalhes mostrarBotaoSalvarEFechar/>
        )}>
        Testando
       </LayoutBaseDePagina>
    )
}