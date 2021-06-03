import { IsRemovable, DeletePropertiesForApi } from '@shared_core/decorators/delete-for-api.decorator';

export class FeatureModel {

    IdCatalog: string;
    Name: string;
    Description: string;
    Path: string;
    Status: number;

    @IsRemovable()
    private _iconFile: string | File;

    get iconFile(): string | File { return this._iconFile || this.Path };
    set iconFile(file: string | File) { this._iconFile = file };

    constructor(options?: {
        IdCatalog?: string,
        Name?: string,
        Description?: string,
        Path?: string,
        Status?: number
    }) {
        this.IdCatalog = options?.IdCatalog || null;
        this.Name = options?.Name || null;
        this.Description = options?.Description || null;
        this.Path = options?.Path || null;
        this.Status = options?.Status || 0;
    }

    @DeletePropertiesForApi()
    deletePrivatesAttributes() {
        delete this._iconFile;
    }
}