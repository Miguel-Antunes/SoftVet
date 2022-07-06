import { Endereco } from "../endereco";

export class Veterinario{
    id: number;
    nome: string;
    cpf: string;
    sexo: string;
    dataNascimento: string;
    telefone: string;
    endereco: Endereco = new Endereco();
    email: string;
    dataCadastro!: string;
    
}