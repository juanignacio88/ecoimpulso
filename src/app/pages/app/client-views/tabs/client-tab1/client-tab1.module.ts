import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientTab1PageRoutingModule } from './client-tab1-routing.module';

import { ClientTab1Page } from './client-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientTab1PageRoutingModule
  ],
  declarations: [ClientTab1Page]
})
export class ClientTab1PageModule {}
