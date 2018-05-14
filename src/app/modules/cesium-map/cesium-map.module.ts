import {NgModule} from '@angular/core';
import {CesiumMapRoutingModule} from './cesium-map.module.routing';
import {CESIUM_MAP_COMPONENTS} from './components';
import {CESIUM_MAP_SERVICE} from './services';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CesiumMapRoutingModule
  ],
  declarations: [
    ...CESIUM_MAP_COMPONENTS
  ],
  providers: [
    ...CESIUM_MAP_SERVICE
  ],
  exports: [
    ...CESIUM_MAP_COMPONENTS
  ]
})
export class CesiumMapModule {
}
