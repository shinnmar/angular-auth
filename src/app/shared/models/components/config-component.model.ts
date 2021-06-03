export class ConfigComponent {
    title: string;
    description: string;
    icon: string;
    columns: string[];
    filterColumns: string[];
    smallTableColumns: string[];

    constructor(options?: Partial<ConfigComponent>) {
        this.title = options?.title || 'Titulo';
        this.description = options?.description || 'Descripción';
        this.icon = options?.icon || 'check';
        this.columns = options?.columns || [];
        this.filterColumns = options?.filterColumns || [];
        this.smallTableColumns = options?.smallTableColumns || [];
    }
}