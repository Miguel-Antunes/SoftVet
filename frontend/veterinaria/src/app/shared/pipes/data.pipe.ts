import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'data'
})
export class DataPipe implements PipeTransform {

    transform(data) {

        const dataSeparada: string[] = data.split("-");
        return `${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`

    }
}