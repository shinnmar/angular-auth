import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'decimalFormat'
})

export class DecimalFormatPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        let values = String(value).split(".");
        if (args[0] == 'n' && values[0]) return values[0];
        if (args[0] == 'd' && values[1]) return `.${values[1].padEnd(2, "0")}`;

        return "";
    }
}