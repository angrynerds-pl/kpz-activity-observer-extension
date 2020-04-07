import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import * as Pages from "./pages";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: Pages.SettingsComponent,
      },
      {
        path: "password",
        component: Pages.ChangePasswordComponent,
      },
      {
        path: "email",
        component: Pages.ChangeEmailComponent,
      },
      {
        path: "name",
        component: Pages.ChangeNameComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SettingsRoutingModule {}
