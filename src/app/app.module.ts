import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RateSummeryComponent } from './rate-summery/rate-summery.component';
import { routers } from './app-routes';
import {  HttpClientModule } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    RateSummeryComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,routers,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
