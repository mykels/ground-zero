import {NgModule} from '@angular/core';
import {AC_MAP_SERVICES} from './services';
import {AC_MAP_COMPONENTS} from './components';
import {MapRoutingModule} from './ac-map.module.routing';
import {AngularCesiumModule, CesiumService, ViewerConfiguration} from 'angular-cesium';

@NgModule({
  imports: [
    AngularCesiumModule.forRoot(),
    MapRoutingModule
  ],
  declarations: [...AC_MAP_COMPONENTS],
  providers: [
    ...AC_MAP_SERVICES,
    ViewerConfiguration,
    CesiumService
  ],
  exports: []
})
export class AcMapModule {
}
