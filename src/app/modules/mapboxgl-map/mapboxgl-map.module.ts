import { NgModule } from '@angular/core';
import { MAPBOXGL_MAP_COMPONENTS } from './components';
import { MapboxglMapRoutingModule } from "./mapboxgl-map.module.routing";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { MAPBOXGL_MAP_SERVICES } from "./services";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MapboxglMapRoutingModule
  ],
  declarations: [
    ...MAPBOXGL_MAP_COMPONENTS
  ],
  providers: [
    ...MAPBOXGL_MAP_SERVICES
  ],
  exports: []
})
export class MapboxglMapModule {
}
