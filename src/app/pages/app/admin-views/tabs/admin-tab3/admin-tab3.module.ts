import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTab3PageRoutingModule } from './admin-tab3-routing.module';

import { AdminTab3Page } from './admin-tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTab3PageRoutingModule
  ],
  declarations: [AdminTab3Page]
})
export class AdminTab3PageModule {}
