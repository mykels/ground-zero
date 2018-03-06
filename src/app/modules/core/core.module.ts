import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from './core.routing';
import {MatToolbarModule} from '@angular/material';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
  imports: [
    CoreRoutingModule,
    MatToolbarModule,
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [],
  exports: [
    RouterModule,
    NavbarComponent
  ]
})
export class CoreModule {
}
