import { Animal } from "src/app/animais/interfaces/animal";
import { Endereco } from "../../shared/interfaces/endereco";

export class Proprietario {
    id: number;
    nome: any;
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
    dataCadastro: string;
    animais: Animal[];

}