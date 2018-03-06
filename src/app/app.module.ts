import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './modules/core/core.module';
import {MasterComponent} from './modules/master/master.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    MasterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
