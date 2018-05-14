import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterComponent} from '../master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'acMap',
        loadChildren: 'app/modules/ac-map/ac-map.module#AcMapModule',
      },
      {
        path: 'cesiumMap',
        loadChildren: 'app/modules/cesium-map/cesium-map.module#CesiumMapModule',
      },
      {
        path: '',
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
