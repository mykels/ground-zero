import { NgModule } from '@angular/core';
import { APP_COMPONENTS } from './components';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    ...APP_COMPONENTS
  ],
  providers: [],
  bootstrap: [
    ...APP_COMPONENTS
  ]
})
export class AppModule {
}
