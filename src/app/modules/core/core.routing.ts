import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MasterComponent } from './components/master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'cesiumMap',
        loadChildren: '../../../app/modules/cesium-map/cesium-map.module#CesiumMapModule',
      },
      {
        path: 'acMap',
        loadChildren: '../../../app/modules/ac-map/ac-map.module#AcMapModule',
      },
      {
        path: 'leafletMap',
        loadChildren: '../../../app/modules/leaflet-map/leaflet-map.module#LeafletMapModule',
      },
      {
        path: 'mapboxglMap',
        loadChildren: '../../../app/modules/mapboxgl-map/mapboxgl-map.module#MapboxglMapModule',
      },
      {
        path: '**',
        redirectTo: 'cesiumMap',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {
}
