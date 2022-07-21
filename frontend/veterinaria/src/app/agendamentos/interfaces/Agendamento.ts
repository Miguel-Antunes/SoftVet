import { Animal } from "src/app/animais/interfaces/animal";
import { Veterinario } from "src/app/veterinarios/interfaces/veterinario";

export class Agendamento {
    id: number;
    veterinario: Veterinario = new Veterinario();
    animal: Animal = new Animal();
    dataAgendada: string;
    dataRealizacao: string;
}