import { Animal } from "src/app/animais/interfaces/animal";
import { Veterinario } from "src/app/veterinarios/interfaces/veterinario";

export class Consulta {

    id: number;
    veterinario: Veterinario;
    animal: Animal;
    estadoAnimal: string;
    ferimento: string;
    dores: string;
    febre: string;
    queixa: string;
    observacao: string;
    procedimento: string;
    dataRealizacao: string;
    receita: string;
}