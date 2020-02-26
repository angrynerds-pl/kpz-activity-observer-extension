import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  single: any[] = [
    {
      "name": "Sadistic",
      "value": 8940000
    },
    {
      "name": "Kwejk",
      "value": 5000000
    },
    {
      "name": "YouTube",
      "value": 7200000
    },
    {
      "name": "Facebook",
      "value": 6200000
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
