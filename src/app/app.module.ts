import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StateComponent } from './state/state.component';
import { WorldComponent } from './world/world.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StateComponent,
    WorldComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgxChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
