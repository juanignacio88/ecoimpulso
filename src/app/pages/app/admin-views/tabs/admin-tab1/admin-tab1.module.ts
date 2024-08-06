import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTab1PageRoutingModule } from './admin-tab1-routing.module';

import { AdminTab1Page } from './admin-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTab1PageRoutingModule
  ],
  declarations: [AdminTab1Page]
})
export class AdminTab1PageModule {}
