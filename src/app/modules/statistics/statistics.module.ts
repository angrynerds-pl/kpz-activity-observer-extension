import { StatisticsRoutingModule } from "@app/modules/statistics/statistics-routing.module";
import { SharedModule } from "@app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import * as Pages from "./pages";

@NgModule({
  declarations: [Pages.StatisticsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class StatisticsModule {}
