import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { getImageDimensions } from '../../../utils';
import { ToolService } from '../../../core/services/core.service';
import { Constants } from '../../../models/constants.model';

@Component({
    selector: 'widget-input-type-file',
    templateUrl: './input-type-file.component.html'
})

export class WidgetInputTypeFileComponent implements OnInit {

    @Input() fileType: string = 'all';
    @Input() multiple: boolean = false;
    @Input() dimensions: number[] = [];
    @Output() files: EventEmitter<File[]> = new EventEmitter<File[]>();

    @ViewChild("inputFile", { static: true }) inputFile: ElementRef;

    constructor(
        private toolService: ToolService
    ) { }

    ngOnInit() {

    }

    open() {
        this.inputFile.nativeElement.click();
    }

    async changeFiles() {
        let files = Array.from(<FileList>this.inputFile.nativeElement.files);
        let allowFiles: File[] = [];
        let allowImages = true;

        if (this.dimensions.length == 2 && this.fileType == 'images') {
            this.toolService.splash.show('Validando imágenes');
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                let _dimensions = await getImageDimensions(element);
                if (_dimensions[0] != this.dimensions[0] || _dimensions[1] != this.dimensions[1]) {
                    allowImages = false;
                } else {
                    allowFiles.push(element);
                }
            }
            this.toolService.splash.hide();
        } else {
            allowFiles = files;
        }

        if (!allowImages) {
            this.toolService.sweetAlert.show(Constants.STATUS.Warning, `Las imágenes seleccionadas deben ser de <b>Ancho: ${this.dimensions[0]}px</b> , <b>Alto: ${this.dimensions[1]}px</b>`);
        }

        this.files.emit(allowFiles);
        this.inputFile.nativeElement.value = '';
    }

}