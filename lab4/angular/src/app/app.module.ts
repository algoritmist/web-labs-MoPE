import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GraphComponent } from './main-page/graph/graph.component';
import { AuthFormComponent } from './auth-page/auth-form/auth-form.component';
import { MainFormComponent } from './main-page/main-form/main-form.component';
import { ResultsTableComponent } from './main-page/results-table/results-table.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestInterceptorService } from './request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GraphComponent,
    AuthFormComponent,
    MainFormComponent,
    ResultsTableComponent,
    AuthPageComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
