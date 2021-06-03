import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from "@angular/cdk/overlay";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CoreModule } from '../core/core.module';

import { WidgetImgS3Component } from './widgets-old/img-s3/img-s3.component';
import { WidgetInputTypeFileComponent } from './widgets-old/input-type-file/input-type-file.component';
import { WidgetSelectGroupComponent } from './widgets-old/select-group/select-group.component';
import { WidgetSelectTreeComponent } from './widgets-old/select-tree/select-tree.component';
import { WidgetSvgIconComponent } from './svg-icon/svg-icon.component';

import { WidgetInputTextComponent } from './input-text/input-text.component';
import { WidgetDropdownComponent } from './dropdown/dropdown.component';
import { WidgetInputTextAreaComponent } from './input-textarea/input-textarea.component';
import { WidgetInputNumberComponent } from './input-number/input-number.component';
import { WidgetCalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatProgressSpinnerModule,
    FormsModule,
    OverlayModule,
  ],
  declarations: [
    WidgetImgS3Component,
    WidgetInputTypeFileComponent,
    WidgetSelectGroupComponent,
    WidgetSelectTreeComponent,
    WidgetSvgIconComponent,

    WidgetInputTextComponent,
    WidgetDropdownComponent,
    WidgetInputTextAreaComponent,
    WidgetInputNumberComponent,
    WidgetCalendarComponent
  ],
  exports: [
    WidgetImgS3Component,
    WidgetInputTypeFileComponent,
    WidgetSelectGroupComponent,
    WidgetSelectTreeComponent,
    WidgetSvgIconComponent,

    WidgetInputTextComponent,
    WidgetDropdownComponent,
    WidgetInputTextAreaComponent,
    WidgetInputNumberComponent,
    WidgetCalendarComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WidgetInputTextComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WidgetDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WidgetInputTextAreaComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WidgetInputNumberComponent),
      multi: true
    }
  ]
})
export class WidgetsModule { }
