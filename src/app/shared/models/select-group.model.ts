export class SelectGroupModel {
    NameGroup: string;
    Id: string;
    Name: string;

    constructor(options?: {
        NameGroup?: string,
        Id?: string,
        Name?: string,
    }) {
        this.NameGroup = options?.NameGroup || null;
        this.Id = options?.Id || 'IdCatalog';
        this.Name = options?.Name || 'Name';
    }
}

export class ListSelectGroupModel<T> {

    Group: SelectGroupModel;
    List: T[];

    constructor(options?: {
        Group?: SelectGroupModel,
        List?: T[],
    }) {
        this.Group = new SelectGroupModel();
        this.List = options?.List || [];
    }
}