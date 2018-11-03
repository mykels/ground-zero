import { NgModule } from '@angular/core';
import { APP_COMPONENTS } from './components';
import { CoreModule } from '../core/core.module';
import { APP_SERVICES } from "./services";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    CoreModule,
  ],
  declarations: [
    ...APP_COMPONENTS
  ],
  providers: [
    ...APP_SERVICES
  ],
  bootstrap: [
    ...APP_COMPONENTS
  ],
  exports: [
    ...APP_COMPONENTS
  ],
})
export class AppModule {
}
