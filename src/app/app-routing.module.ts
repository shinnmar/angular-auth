import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      //import('./shared/components/base/errors/errors.module').then((m) => m.ErrorsModule),
      import('@shared_components/base/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./base/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/extranet/extranet.module').then((m) => m.ExtranetModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
