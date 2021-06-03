import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';

import { SweetAlertService } from './services/sweet-alert.service';
import { ToolService } from './services/core.service';
import { InputTypeSizeValidationDirective } from './directives/input-type-size-validation.directive';
import { InputRequiredDirective } from './directives/input-required.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { OnlyLettersDirective } from './directives/only-letters.directive';
import { OnTheScreenDirective } from './directives/on-the-screen.directive';
import { DragVerticalDirective } from './directives/drag-vertical.directive';
import { DecimalFormatPipe } from './pipes/decimal-format.pipe';
import { InputIdentityTypeDirective } from './directives/input-identity-type.directive';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    FirstLetterPipe,
    SafePipe,
    DecimalFormatPipe,
    InputTypeSizeValidationDirective,
    InputRequiredDirective,
    OnlyNumbersDirective,
    OnlyLettersDirective,
    OnTheScreenDirective,
    DragVerticalDirective,
    InputIdentityTypeDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    SweetAlertService,
    ToolService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { autoFocus: false, hasBackdrop: true, disableClose: true, } },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [
    MatDatepickerModule,
    FirstLetterPipe,
    SafePipe,
    DecimalFormatPipe,
    InputTypeSizeValidationDirective,
    InputRequiredDirective,
    OnlyNumbersDirective,
    OnlyLettersDirective,
    OnTheScreenDirective,
    DragVerticalDirective,
    InputIdentityTypeDirective
  ],
})
export class CoreModule { }
