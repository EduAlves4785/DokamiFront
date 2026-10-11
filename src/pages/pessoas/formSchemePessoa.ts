import * as Yup from "yup";
import { IDetalhePessoa } from "../../shared/services/api/pessoas/PessoasService";

export const formScheme: IDetalhePessoa = { id:0,nomeCompleto: '', email: '', cidadeId: 0 }

export const formValidationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Nome é obrigatório').min(3, 'O nome deve ter no mínimo 3 caracteres').max(50, 'O nome não pode ter mais de 50 caracteres'),
    email:Yup.string().trim().required('O preenchimento do email é obrigatório'),
    cidadeId:Yup.number().required().positive().integer()
});