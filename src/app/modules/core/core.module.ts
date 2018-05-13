import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from './core.routing';
import {MatToolbarModule} from '@angular/material';
import {CORE_COMPONENTS} from './components';
import {CORE_SERVICES} from './services';
import {StoreModule} from '@ngrx/store';
import {initialState, reducerMap} from '../store/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CoreRoutingModule,
    MatToolbarModule,
    StoreModule.forRoot(reducerMap, {initialState}),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: false,
    }),
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
