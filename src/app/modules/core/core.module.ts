import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from './core.routing';
import {MatToolbarModule} from '@angular/material';
import {CORE_COMPONENTS} from './components';
import {CORE_SERVICES} from './services';

@NgModule({
  imports: [
    CoreRoutingModule,
    MatToolbarModule,
  ],
  declarations: [
    ...CORE_COMPONENTS
  ],
  providers: [
    ...CORE_SERVICES
  ],
  exports: [
    RouterModule,
    ...CORE_COMPONENTS
  ]
})
export class CoreModule {
}
