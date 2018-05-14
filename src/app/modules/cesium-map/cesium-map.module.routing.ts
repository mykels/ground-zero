import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CesiumMapComponent} from './components/cesium-map/cesium-map.component';

const routes: Routes = [
  {
    path: '',
    component: CesiumMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CesiumMapRoutingModule {
}
