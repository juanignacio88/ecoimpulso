import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientTab3PageRoutingModule } from './client-tab3-routing.module';

import { ClientTab3Page } from './client-tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientTab3PageRoutingModule
  ],
  declarations: [ClientTab3Page]
})
export class ClientTab3PageModule {}
