import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core.routing';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CORE_COMPONENTS } from './components';
import { CORE_SERVICES } from './services';
import { StoreModule } from '@ngrx/store';
import { initialState, reducerMap } from '../store/store';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot(reducerMap, {initialState})
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
