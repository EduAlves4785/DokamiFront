import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentaDeDetalhes } from "../../shared/components"

export const DetalheDePessoas: React.FC = () => {
   
    const{id='nova'}=useParams<'id'>()
    const navigate = useNavigate()
   

    const handleSave = () => {
        console.log('Salvar')
    }

    const handleDelete = () => {
        console.log('Apagar')
    }

    return (
        <LayoutBaseDePagina
            titulo='Detalhe de pessoas'
            barraDeFerramentas={
                <FerramentaDeDetalhes
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
               
                    aoClicarEmSalvar={() => handleSave()}
                    aoClicarEmSalvarEFechar={() => console.log('Salvar e fechar')}
                    aoClicarEmApagar={() => handleDelete()}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}            
                    aoClicarEmVoltar={() =>navigate('/pessoas')}
                    />
            }>
            <p>Detalhe de pessoas {id}</p>
        </LayoutBaseDePagina>
    )
}