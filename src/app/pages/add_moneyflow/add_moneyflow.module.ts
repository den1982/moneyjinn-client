import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './add_moneyflow.routing';
import {AddMoneyflow} from "./add_moneyflow.component";

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        AddMoneyflow
    ]
})
export default class AddMoneyfloeModule{}