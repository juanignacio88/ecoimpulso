import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { clientUserGuard } from './guards/client/client-user.guard';
import { adminUserGuard } from './guards/admin/admin-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'auth/register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/app/admin-views/admin-tabs/admin-tabs.module').then(m => m.AdminTabsPageModule),
    canActivate: [adminUserGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/app/client-views/client-tabs/client-tabs.module').then(m => m.ClientTabsPageModule),
    canActivate: [clientUserGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
