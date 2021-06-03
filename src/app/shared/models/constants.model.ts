enum STATUS {
    Success = 1,
    Error = -1,
    Warning = -2,
    Forbidden = -3,
    Unauthorized = -4,
    UnprocessableModel = -5,
}

enum STATUS_MESSAGES {
    Success = 'La operación se ejecutó correctamente',
    Error = 'Ocurrio un error',
    Warning = '',
    Forbidden = 'Forbidden',
    Unauthorized = 'Unauthorized',
    UnprocessableModel = 'Unprocessable',
}


//IDENTITY TYPES
enum IDENTITY_TYPE {
    Dni = 1,
    ImmigrationCard = 2
}

namespace IDENTITY_TYPE {
    export function toString(key: number): string {
        switch (key) {
            case IDENTITY_TYPE.Dni: return 'Dni';
            case IDENTITY_TYPE.ImmigrationCard: return 'Carnet extranjería';
            default: return 'Undefined';
        }
    }

    export function toList(): any[] {
        let list = [IDENTITY_TYPE.Dni, IDENTITY_TYPE.ImmigrationCard];
        return list.map(key => ({ Id: key, Description: toString(key) }));
    }

}

export class Constants {
    static API_NAME = 'api';
    static API_NAME_LOCALHOST = 'localhost';
    static APP_NAME = 'Web';
    static STATUS = STATUS;
    static STATUS_MESSAGES = STATUS_MESSAGES;
    static IDENTITY_TYPE = IDENTITY_TYPE;
    static PRODUCT_PATH = '/producto/';
    static COMPANY_USER_KEY = 'user-company';
}