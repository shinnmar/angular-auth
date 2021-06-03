import { Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import sweetalert from "sweetalert2";

import { Constants } from '../../models/constants.model';

@Injectable()
export class SweetAlertService {


    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    show(status: number, message: string) {
        if (message.toLocaleLowerCase() === 'success') message = Constants.STATUS_MESSAGES.Success;

        return sweetalert.fire({
            title: this.getTitle(status),
            html: this.sanitizer.sanitize(SecurityContext.HTML, message),
            icon: this.getIcon(status),
            confirmButtonText: 'Ok'
        });
    }

    show2(status: number, message1: string, message2: string = '', confirm: boolean = true) {
        if (message1.toLocaleLowerCase() === 'success') message1 = Constants.STATUS_MESSAGES.Success;

        let message = message1;
        if (message2.length > 0) {
            message += `<div class="alert alert-custom alert-light-success fade show mt-5 py-3" role="alert">
                <div class="alert-icon"><i class="flaticon2-information"></i></div>
                <div class="alert-text text-justify">${message2}</div>
                <div class="alert-close">
            </div>`;
        }

        return sweetalert.fire({
            title: this.getTitle(status),
            html: this.sanitizer.sanitize(SecurityContext.HTML, message),
            icon: this.getIcon(status),
            confirmButtonText: 'Ok',
            showConfirmButton: confirm
        });
    }

    confirmation(message: string) {
        return sweetalert.fire({
            title: this.getTitle(Constants.STATUS.Warning),
            html: this.sanitizer.sanitize(SecurityContext.HTML, message),
            icon: this.getIcon(Constants.STATUS.Warning),
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        });
    }

    confirmation2(message1: string, message2: string) {
        message1 = this.sanitizer.sanitize(SecurityContext.HTML, message1);
        message2 = this.sanitizer.sanitize(SecurityContext.HTML, message2);

        let htmlMessage = `${message1}
        <div class="alert alert-custom alert-light-danger fade show mt-5 py-3" role="alert">
            <div class="alert-icon"><i class="flaticon-warning"></i></div>
            <div class="alert-text text-justify">${message2}</div>
            <div class="alert-close">
        </div>`;

        return sweetalert.fire({
            title: this.getTitle(Constants.STATUS.Warning),
            html: htmlMessage,
            icon: this.getIcon(Constants.STATUS.Warning),
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        });
    }

    private getTitle(status: number) {
        if (status === Constants.STATUS.Success) return 'Éxito';
        if (status === Constants.STATUS.Warning) return 'Advertencia!';
        //if (status === Constants.STATUS.Error) return 'Error!';

        return 'Error';
    }

    private getIcon(status: number) {
        if (status === Constants.STATUS.Success) return 'success';
        if (status === Constants.STATUS.Warning) return 'warning';
        //if (status === Constants.STATUS.Error) return 'error';

        return 'error';
    }

}