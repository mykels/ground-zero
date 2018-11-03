import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/modules/app/app.module';

if (environment.production) {
  enableProdMode();
}

window['CESIUM_BASE_URL'] = 'src/assets/cesium';

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(error => {
  console.error('Error while bootstrapping application, see causing error: ', error);
});
