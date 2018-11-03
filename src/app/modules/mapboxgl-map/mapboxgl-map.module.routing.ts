import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapboxglMapComponent } from "./components/mapboxgl-map/mapboxgl-map.component";

const routes: Routes = [
  {
    path: '',
    component: MapboxglMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapboxglMapRoutingModule {
}
