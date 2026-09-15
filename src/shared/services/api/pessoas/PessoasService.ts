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
        return new Error((error as {mesessage:string}).mesessage|| 'Erro ao listar os registros.')
    }
}

const getById = async (): Promise<Any> => { }

const create = async (): Promise<Any> => { }

const updateById = async (): Promise<Any> => { }

const deleteById = async (): Promise<Any> => { }

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}