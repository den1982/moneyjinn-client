import { Routes, RouterModule }  from '@angular/router';
import {AddMoneyflow} from './add_moneyflow.component';

const routes: Routes = [
    {
        path: '',
        component: AddMoneyflow
    }
];

export const routing = RouterModule.forChild(routes);