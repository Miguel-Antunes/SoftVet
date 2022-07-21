import { Proprietario } from "src/app/proprietarios/interfaces/proprietario";

export class Animal {
    id : number;
    proprietario : Proprietario = new Proprietario;
    nome : string;
    idade : number;
    sexo : string;
    especie : string;
    raca : string;
    cor : string;
    altura : number;
    peso : number;
    tipoSangue : string;


}