import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientTabsPage } from './client-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ClientTabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tabs/client-tab1/client-tab1.module').then(m => m.ClientTab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tabs/client-tab2/client-tab2.module').then(m => m.ClientTab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tabs/client-tab3/client-tab3.module').then(m => m.ClientTab3PageModule)
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
export class ClientTabsPageRoutingModule {}
