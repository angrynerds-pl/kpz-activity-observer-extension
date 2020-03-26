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
  visits: any[] = [];
  times: any[] = [];
  visitsShown: boolean;
  loaded = false;

  constructor(private appApiService: AppApiService) {}

  ngOnInit() {
    this.appApiService.getStatistics().subscribe(response => {
      this.visits = [];
      this.times = [];
      response.data.forEach(site => {
        this.visits.push({
          name: site.url,
          value: site.visits
        });
        this.times.push({
          name: site.url,
          value: site.time
        });
      });
      this.single = this.visits;
      this.visitsShown = true;
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

  showVisits(): void {
    this.single = this.visits;
    this.visitsShown = true;
  }

  showTimes(): void {
    this.single = this.times;
    this.visitsShown = false;
  }
}
