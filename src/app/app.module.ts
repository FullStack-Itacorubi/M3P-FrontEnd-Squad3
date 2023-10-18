import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GlobalHttpErrorHandlerInterceptor } from './middlewares/global-http-error-handler.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { GenericModalComponent } from './shared/components/generic-modal/generic-modal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';

@NgModule( {
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    GenericModalComponent,
    ResetPasswordComponent,
    ContactAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons( { ...IonIcons } ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ],
} )
export class AppModule { }
