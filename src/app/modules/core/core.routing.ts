import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterComponent} from '../master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'cesiumMap',
        loadChildren: 'app/modules/cesium-map/cesium-map.module#CesiumMapModule',
      },
      {
        path: 'acMap',
        loadChildren: 'app/modules/ac-map/ac-map.module#AcMapModule',
      },
      {
        path: 'leafletMap',
        loadChildren: 'app/modules/leaflet-map/leaflet-map.module#LeafletMapModule',
      },
      {
        path: '',
        redirectTo: 'leafletMap',
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
