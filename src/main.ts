import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// import 'reflect-metadata';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
