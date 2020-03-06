import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { AppApiService } from "@app/core/api/app-api.service";
import { fadeIn } from "@app/shared/animations";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
  animations: [fadeIn]
})
export class MenuComponent implements OnInit {
  name: string;
  constructor(
    private authService: AuthService,
    private appApi: AppApiService
  ) {}

  ngOnInit() {
    this.appApi.getUser().subscribe(res => {
      this.name = res.data.name;
    });
  }

  logout() {
    this.authService.logout();
  }

  click() {
    console.log(chrome);
    let activeWindow, allWindows;
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      tabs => {
        activeWindow = tabs[0];
        console.log(activeWindow);
      }
    );
    chrome.windows.getAll({ populate: true }, tabs => {
      allWindows = tabs;
      console.log(allWindows);
    });
  }
}
