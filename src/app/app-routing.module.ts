import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transaction/transaction.module').then((m) => m.TransactionModule),
  },
  {
    path: 'drugs',
    loadChildren: () =>
      import('./drugs/drugs.module').then((m) => m.DrugsModule),
  },
  {
    path: 'sources',
    loadChildren: () =>
      import('./sources/sources.module').then((m) => m.SourcesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
