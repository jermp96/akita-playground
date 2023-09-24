import { Routes } from "@angular/router";
import { DaybookLayoutComponent } from "./pages/layout/daybook-layout.component";

export const DaybookRouting: Routes = [
  {
    path: 'daybook',
    component: DaybookLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/no-entry-selected/no-entry-selected.component')
          .then(mod => mod.NoEntrySelectedComponent)
      },
      {
        path: 'no-entry-selected',
        loadComponent: () => import('./pages/no-entry-selected/no-entry-selected.component')
          .then(mod => mod.NoEntrySelectedComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/entry-view/entry-view.component')
          .then(mod => mod.EntryViewComponent)
      }
    ]
  }
];