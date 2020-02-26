import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  click() {
    console.log(chrome);
    let activeWindow, allWindows;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      activeWindow = tabs[0];
      console.log(activeWindow);
    });
    chrome.windows.getAll({populate:true}, (tabs) => {
      allWindows = tabs;
      console.log(allWindows);
    });
  }
}
