import {NgModule} from '@angular/core';
import {LEAFLET_MAP_COMPONENTS} from './components';
import {LeafletMapRoutingModule} from './leaflet-map.module.routing';

@NgModule({
  imports: [
    LeafletMapRoutingModule
  ],
  declarations: [
    ...LEAFLET_MAP_COMPONENTS
  ],
  providers: [],
  exports: []
})
export class LeafletMapModule {
}
