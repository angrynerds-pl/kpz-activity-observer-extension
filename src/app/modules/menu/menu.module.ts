import {MenuRoutingModule} from "@app/modules/menu/menu-routing.module";
import {SharedModule} from "@app/shared/shared.module";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import * as Pages from './pages';

@NgModule({
  declarations: [
    Pages.MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule
  ]
})
export class MenuModule {
}
