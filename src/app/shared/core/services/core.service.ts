import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import * as utils from "../../utils/types-convertion.utils";

import { SweetAlertService } from './sweet-alert.service';
import { SplashScreenService } from '../../services/root/splash-screen.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ToolService {

    tools = utils;

    constructor(
        public sweetAlert: SweetAlertService,
        public splash: SplashScreenService,
        public dialog: MatDialog,
        public sanitizer: DomSanitizer
    ) { }

}