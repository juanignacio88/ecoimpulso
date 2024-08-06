import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTab1Page } from './admin-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTab1PageRoutingModule {}
