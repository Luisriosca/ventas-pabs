import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'plan-semanal',
        loadComponent: () => import('./pages/plan-semanal.component').then(m => m.PlanSemanalComponent)
      },
      {
        path: 'kpi-vendedor',
        loadComponent: () => import('./pages/kpi-vendedor.component').then(m => m.KpiVendedorComponent)
      }
    ]
  }
];
