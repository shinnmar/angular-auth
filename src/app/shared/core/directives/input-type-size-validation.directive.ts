import { Directive, HostListener, Input } from "@angular/core";
import { SweetAlertService } from '../services/sweet-alert.service';
import { Constants } from '../../models/constants.model';

@Directive({ selector: '[type-size-validation]' })
export class InputTypeSizeValidationDirective {

    private maxSizeOnMb: number = 5;
    private imagesExtensions = ['png', 'jpg', 'jpeg'];

    @Input() fileType = 'all';

    constructor(
        private sweetAlertService: SweetAlertService
    ) {
        //this.maxSizeOnMb = environment.maxSizeUpload || 5;
    }

    @HostListener('change', ['$event.target'])
    onEvent(target: HTMLInputElement) {
        let files = target.files;
        let isCorrectSize = true;
        let isCorrectFile = true;

        for (let index = 0; index < files.length && isCorrectFile && isCorrectSize; index++) {
            let size = files[index].size;
            let extension = files[index].name.split('.').pop().toLowerCase();

            if (this.getSizeOnMb(size) > this.maxSizeOnMb) {
                isCorrectSize = false;
            }

            if (this.fileType === 'images') {
                isCorrectFile = !!this.imagesExtensions.find(e => e == extension);
            }
        }

        if (!isCorrectSize) {
            this.sweetAlertService.show(Constants.STATUS.Warning, `Tamaño máximo del archivo para subir: <b>${this.maxSizeOnMb} MB</b>`);
            target.value = '';
        }

        if (!isCorrectFile) {
            this.sweetAlertService.show(Constants.STATUS.Warning, `Tipo de archivo no permitido`);
            target.value = '';
        }
    }

    private getSizeOnMb(bytes: number): number {
        return bytes / Math.pow(1024, 2);
    }

}