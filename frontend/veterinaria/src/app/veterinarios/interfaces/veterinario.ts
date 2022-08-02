import { Endereco } from "../../shared/interfaces/endereco";

export class Veterinario {
    id: number;
    nome: string;
    cpf: string;
    sexo: string;
    dataNascimento: string;
    telefone: string;
    cep: string;
    cidade: string;
    uf: string;
    rua: string;
    numero: string;
    complemento: string;
    email: string;
    dataCadastro!: string;
    totalConsulta: number;
    situacao: string;

}