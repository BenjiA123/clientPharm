import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./chart/chart.module').then((m) => m.ChartModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transaction/transaction.module').then((m) => m.TransactionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'drugs',
    loadChildren: () =>
      import('./drugs/drugs.module').then((m) => m.DrugsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sources',
    loadChildren: () =>
      import('./sources/sources.module').then((m) => m.SourcesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', component: WelcomeComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule { }
