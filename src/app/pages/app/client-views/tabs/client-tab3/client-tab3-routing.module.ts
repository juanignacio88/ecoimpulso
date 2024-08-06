import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientTab3Page } from './client-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: ClientTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientTab3PageRoutingModule {}
