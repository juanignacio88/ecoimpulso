import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
    ],
    declarations: [ProductFormComponent, ReportFormComponent, GoogleMapsComponent]
  })
export class ComponentsModule {}