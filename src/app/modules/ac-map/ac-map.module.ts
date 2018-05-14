import {NgModule} from '@angular/core';
import {AC_MAP_SERVICES} from './services';
import {AC_MAP_COMPONENTS} from './components';
import {AcMapRoutingModule} from './ac-map.module.routing';
import {AngularCesiumModule, CesiumService, ViewerConfiguration} from 'angular-cesium';

@NgModule({
  imports: [
    AngularCesiumModule.forRoot(),
    AcMapRoutingModule
  ],
  declarations: [
    ...AC_MAP_COMPONENTS
  ],
  providers: [
    ...AC_MAP_SERVICES,
    ViewerConfiguration,
    CesiumService
  ],
  exports: [
    ...AC_MAP_COMPONENTS
  ]
})
export class AcMapModule {
}
