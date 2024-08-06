import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientTab2PageRoutingModule } from './client-tab2-routing.module';

import { ClientTab2Page } from './client-tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientTab2PageRoutingModule
  ],
  declarations: [ClientTab2Page]
})
export class ClientTab2PageModule {}
