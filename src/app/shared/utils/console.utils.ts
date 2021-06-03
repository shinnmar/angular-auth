import { environment } from '../../../environments/environment';
export class ConsoleHelper {

    static log(message?: any, ...optionsParams: any[]) {
        if (!environment.production) {
            //console.log(message, optionsParams);
        }
    }

}