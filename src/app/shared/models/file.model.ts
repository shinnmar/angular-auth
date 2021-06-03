export class CommonFile {
    Name: string;
    Path: string;
    Extension: string;
    Size: number;
    Time: string;

    private _commonFile: string | File;

    get commonFile(): string | File { return this._commonFile || this.Path };
    set commonFile(file: string | File) { this._commonFile = file };

    constructor(options?: {
        Name?: string,
        Path?: string,
        Extension?: string,
        Size?: number,
        Time?: string,
    }) {
        this.Name = options?.Name || null;
        this.Path = options?.Path || null;
        this.Extension = options?.Extension || null;
        this.Size = options?.Size || 0;
        this.Time = options?.Time || String(new Date().getTime());
    }

    static fromFile(file: File): CommonFile {
        let cf = new CommonFile({
            Name: file.name,
            Path: null,
            Extension: file.name.split('.').pop(),
            Size: file.size
        });
        cf.commonFile = file;
        return cf;
    }

    deletePrivatesAttributes() {
        delete this._commonFile;
    }
}