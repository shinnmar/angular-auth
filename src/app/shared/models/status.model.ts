enum ASESOR_STATUS {
    Active = 1,
    Inactive = 0
}

enum PRODUCTO_STATUS {
    All = -1,
    Deleted = 0,
    Published = 2,
    Hidden = 3,
}

namespace ASESOR_STATUS {
    export function toList() {
        return Object.keys(ASESOR_STATUS)
            .filter(value => isNaN(Number(value)) === false)
            .map(key => new CommonStatus({ Id: parseInt(key), Description: ASESOR_STATUS.toString(parseInt(key)) }));
    }
    export function toString(key: number) {
        switch (key) {
            case ASESOR_STATUS.Active:
                return 'Activo';

            case ASESOR_STATUS.Inactive:
                return 'Inactivo';
        }
    }
}

namespace PRODUCTO_STATUS {
    export function toList() {
        let hiddenIds: number[] = [PRODUCTO_STATUS.Deleted, PRODUCTO_STATUS.All];
        return Object.keys(PRODUCTO_STATUS)
            .filter(value => isNaN(Number(value)) === false)
            .filter(value => !hiddenIds.includes(parseInt(value)))
            .map(key => new CommonStatus({ Id: parseInt(key), Description: PRODUCTO_STATUS.toString(parseInt(key)) }));
    }
    export function toListWithTodos() {
        let list = toList();
        list.unshift(new CommonStatus({ Id: PRODUCTO_STATUS.All, Description: PRODUCTO_STATUS.toString(PRODUCTO_STATUS.All) }));
        return list;
    }
    export function toString(key: number) {
        switch (key) {
            case PRODUCTO_STATUS.Published:
                return 'Publicado';

            case PRODUCTO_STATUS.Hidden:
                return 'Oculto';

            case PRODUCTO_STATUS.Deleted:
                return 'Eliminado';

            case PRODUCTO_STATUS.All:
                return 'Todos';
        }
    }
    export function toColor(key: number) {
        switch (key) {
            case PRODUCTO_STATUS.Published:
                return 'bg-success-green';

            case PRODUCTO_STATUS.Hidden:
                return 'bg-info';

            case PRODUCTO_STATUS.Deleted:
                return 'bg-danger';

            case PRODUCTO_STATUS.All:
                return '';
        }
    }
}

export class ALL_STATUS {

    static ASESOR = ASESOR_STATUS;
    static PRODUCTO = PRODUCTO_STATUS;

}

export class CommonStatus {
    Id: number;
    Description: string;
    Color?: string;

    constructor(options?: {
        Id?: number,
        Description?: string
    }) {
        this.Id = options?.Id || 0;
        this.Description = options?.Description || null;
        this.Color = null;
    }
}