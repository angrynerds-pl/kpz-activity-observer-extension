import { SettingsRoutingModule } from "@app/modules/settings/settings-routing.module";
import { SharedModule } from "@app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import * as Pages from "./pages";

@NgModule({
  declarations: [
    Pages.SettingsComponent,
    Pages.ChangePasswordComponent,
    Pages.ChangeEmailComponent,
    Pages.ChangeNameComponent,
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
