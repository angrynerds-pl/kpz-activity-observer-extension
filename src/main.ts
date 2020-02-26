import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from "@env/environment";
import {enableProdMode} from '@angular/core';
import {AppModule} from "@app/app.module";
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
