import * as Yup from "yup";
import { IDetalhePessoa } from "../../shared/services/api/pessoas/PessoasService";

export const formScheme: IDetalhePessoa = { id: 0, nomeCompleto: '', email: '', cidadeId: 0 }

export const formValidationSchema = Yup.object({
    nomeCompleto: Yup.string()
        .trim()
        .required("Nome é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(50, "O nome não pode ter mais de 50 caracteres"),

    email: Yup.string()
        .trim()
        .email("Informe um e-mail válido")
        .required("O preenchimento do e-mail é obrigatório"),

    cidadeId: Yup.number()
        .typeError("Informe um ID de cidade válido")
        .required("O ID da cidade é obrigatório")
        .positive("O ID deve ser positivo")
        .integer("O ID deve ser um número inteiro")
});