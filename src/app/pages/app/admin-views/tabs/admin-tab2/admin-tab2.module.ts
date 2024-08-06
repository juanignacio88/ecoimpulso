import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTab2PageRoutingModule } from './admin-tab2-routing.module';

import { AdminTab2Page } from './admin-tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTab2PageRoutingModule
  ],
  declarations: [AdminTab2Page]
})
export class AdminTab2PageModule {}
