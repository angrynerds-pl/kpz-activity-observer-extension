import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppWrapperComponent, AuthWrapperComponent } from "@app/shared/layout";
import { AuthGuard } from "@app/core/guards";

const routes: Routes = [
  {
    path: "",
    component: AuthWrapperComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/auth/auth.module").then(m => m.AuthModule)
      }
    ]
  },
  {
    path: "app",
    canActivate: [AuthGuard],
    component: AppWrapperComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/menu/menu.module").then(m => m.MenuModule)
      },
      {
        path: "statistics",
        loadChildren: () =>
          import("./modules/statistics/statistics.module").then(
            m => m.StatisticsModule
          )
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./modules/settings/settings.module").then(
            m => m.SettingsModule
          )
      },
      {
        path: "**",
        redirectTo: "dashboard"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
