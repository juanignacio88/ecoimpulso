import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTabsPage } from './admin-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tabs/admin-tab1/admin-tab1.module').then(m => m.AdminTab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tabs/admin-tab2/admin-tab2.module').then(m => m.AdminTab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tabs/admin-tab3/admin-tab3.module').then(m => m.AdminTab3PageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsPageRoutingModule {}
