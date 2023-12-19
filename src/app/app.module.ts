import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { urlInterceptor } from './core/interceptors/url.interceptor';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,

  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor,urlInterceptor,headersInterceptor,errorInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
