import {NgModule} from '@angular/core';
import {MapRoutingModule} from './map.module.routing';
import {AngularCesiumModule} from 'angular-cesium';
import {MAP_SERVICES} from './services';
import {MAP_COMPONENTS} from './components';

@NgModule({
  imports: [
    MapRoutingModule,
    AngularCesiumModule.forRoot()
  ],
  declarations: [...MAP_COMPONENTS],
  providers: [...MAP_SERVICES],
  exports: []
})
export class MapModule {
}
