import { Environment } from "../../../environment"
import { Api } from "../axios-config"

interface IListagemPessoa {
    id: number,
    nomeCompleto: string,
    email: string,
    cidadeId: number
}

interface IDetalhePessoa {
    id: number,
    nomeCompleto: string,
    email: string,
    cidadeId: number
}

type TPessoaComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoaComTotalCount | Error> => {
    try {
        const urlRelative = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        const { data, headers } = await Api.get(urlRelative)
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
            }
        }

        return new Error('Erro ao listar os registros.')

    } catch (error) {
        console.error(error)
        //O erro retornado pelo axios não é do tipo Error, então precisamos fazer um cast para acessar a propriedade message
        return new Error((error as { mesessage: string }).mesessage || 'Erro ao listar os registros.')
    }
}

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {

        const { data } = await Api.get(`/pessoas/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar o registro.')

    } catch (error) {
        console.error(error)
        //O erro retornado pelo axios não é do tipo Error, então precisamos fazer um cast para acessar a propriedade message
        return new Error((error as { mesessage: string }).mesessage || 'Erro ao listar os registros.')
    }

}
//Omit serve para criar um novo tipo baseado em outro,
// mas omitindo algumas propriedades. No caso, estamos criando um novo tipo baseado em IDetalhePessoa,
//  mas omitindo a propriedade id, pois ela não é necessária para criar um novo registro.
const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api.post<IDetalhePessoa>(`/pessoas`, dados)

        if (data) {
            return data.id
        }

        return new Error('Erro ao criar o registro.')

    } catch (error) {
        console.error(error)
        //O erro retornado pelo axios não é do tipo Error, então precisamos fazer um cast para acessar a propriedade message
        return new Error((error as { mesessage: string }).mesessage || 'Erro ao criar o registros.')
    }
}

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
    try {

        await Api.put(`/pessoas/${id}`, dados)

    } catch (error) {
        console.error(error)
        //O erro retornado pelo axios não é do tipo Error, então precisamos fazer um cast para acessar a propriedade message
        return new Error((error as { mesessage: string }).mesessage || 'Erro ao atualizar o registros.')
    }
}

const deleteById = async (id:number): Promise<void | Error> => {
    try {

        await Api.delete(`/pessoas/${id}`)

    } catch (error) {
        console.error(error)
        //O erro retornado pelo axios não é do tipo Error, então precisamos fazer um cast para acessar a propriedade message
        return new Error((error as { mesessage: string }).mesessage || 'Erro ao apagar o registros.')
    }
}

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}