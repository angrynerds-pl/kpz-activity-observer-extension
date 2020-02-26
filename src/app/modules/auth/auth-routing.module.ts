import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Pages.LoginComponent
      },
      {
        path: 'register',
        component: Pages.RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {
}
