import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/daybook/daybook-routing.routing').then(mod => mod.DaybookRouting)
  }
];
