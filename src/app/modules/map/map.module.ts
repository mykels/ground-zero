import {NgModule} from '@angular/core';
import {MapComponent} from './components/map/map.component';
import {MapRoutingModule} from './map.module.routing';
import {AngularCesiumModule, AngularCesiumWidgetsModule} from 'angular-cesium';

@NgModule({
  imports: [
    MapRoutingModule,
    AngularCesiumModule.forRoot()
  ],
  declarations: [MapComponent]
})
export class MapModule {
}
