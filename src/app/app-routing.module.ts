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

  // Later feature
  {
    path: 'message',
    loadChildren: () =>
      import('./message/message.module').then((m) => m.MessageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings-routing.module').then((m) => m.SettingsRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer-section/customer-section.module').then((m) => m.CustomerSectionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dispatch-rider',
    loadChildren: () =>
      import('./dispatch-rider-section/dispatch-rider-section.module').then((m) => m.DispatchRiderSectionModule),
    // canActivate: [AuthGuard]
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
      // preloadingStrategy: PreloadAllModules,
      useHash: true
    }),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule { }
