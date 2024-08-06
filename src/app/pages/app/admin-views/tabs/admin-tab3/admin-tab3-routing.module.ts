import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTab3Page } from './admin-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTab3PageRoutingModule {}
