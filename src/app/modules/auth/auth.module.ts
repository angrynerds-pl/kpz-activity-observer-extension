import {AuthRoutingModule} from "@app/modules/auth/auth-routing.module";
import {SharedModule} from "@app/shared/shared.module";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import * as Pages from './pages';

@NgModule({
  declarations: [
    Pages.LoginComponent,
    Pages.RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
