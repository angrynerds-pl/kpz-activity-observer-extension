import { Component, OnInit } from "@angular/core";
import { AppApiService } from "@app/core/api/app-api.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {
  single: any[] = [];
  loaded = false;

  constructor(private appApiService: AppApiService) {}

  ngOnInit() {
    this.appApiService.getStatistics().subscribe(response => {
      const holder = [];
      response.data.forEach(site => {
        holder.push({
          name: site.url,
          value: site.timestamps.length
        });
      });
      this.single = holder;
      this.loaded = true;
    });
  }

  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
}
