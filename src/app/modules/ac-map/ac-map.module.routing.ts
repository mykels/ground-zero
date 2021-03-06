import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcMapComponent} from './components/ac-map/ac-map.component';

const routes: Routes = [
  {
    path: '',
    component: AcMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcMapRoutingModule {
}
