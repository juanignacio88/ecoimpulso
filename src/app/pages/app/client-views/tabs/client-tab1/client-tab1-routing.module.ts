import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientTab1Page } from './client-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: ClientTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientTab1PageRoutingModule {}
