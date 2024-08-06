import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientTab2Page } from './client-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: ClientTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientTab2PageRoutingModule {}
