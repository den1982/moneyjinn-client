import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login', loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'addMoneyflow', loadChildren: () => System.import('./add_moneyflow/add_moneyflow.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
