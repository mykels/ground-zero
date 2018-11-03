import { NgModule } from '@angular/core';
import { SHARED_COMPONENTS } from "./components";
import { SHARED_SERVICES } from "./services";

@NgModule({
  imports: [],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  providers: [
    ...SHARED_SERVICES
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule {
}
