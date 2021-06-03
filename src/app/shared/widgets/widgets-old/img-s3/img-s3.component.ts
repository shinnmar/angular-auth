import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AmplifyHelper } from '../../../utils/amplify.utils';
import * as convertionUtils from "../../../utils/types-convertion.utils";

@Component({
    selector: 'widget-img-s3',
    templateUrl: './img-s3.component.html',
    host: { 'class': 'img-s3' }
})

export class WidgetImgS3Component implements OnInit, OnChanges {

    defaultPath = '/assets/media/blank.png';
    loading = false;

    @Input() path: string | File = '';
    @Input() typeIcon: boolean = true;

    constructor() { }

    ngOnInit() {
        this.getImage();
    }

    ngOnChanges() {
        this.getImage();
    }

    loaded() {
        if (this.defaultPath != '/assets/media/blank.png' && this.loading) {
            this.loading = false;
        }
    }

    error() {
        this.defaultPath = (this.defaultPath != '/assets/media/blank.png') ? '/assets/media/blank.png' : this.defaultPath;
        this.loading = false;
    }

    private async getImage() {
        if (this.path != null) {
            this.loading = true;

            if (this.path instanceof File) {
                this.defaultPath = await convertionUtils.getUrlFromFile(this.path);
                //this.loading = false;
            }

            if (typeof this.path === "string") {
                this.defaultPath = await AmplifyHelper.getSignedURL(this.path);
                //this.loading = false;
            }
        } else {
            this.defaultPath = (this.defaultPath != '/assets/media/blank.png') ? '/assets/media/blank.png' : this.defaultPath;
        }
    }
}