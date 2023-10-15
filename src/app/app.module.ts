import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavButtonComponent } from './components/sidebar/nav-button/nav-button.component';
import { UserComponent } from './pages/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [AppComponent, LayoutComponent, SidebarComponent, NavButtonComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ ...IonIcons }),
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [ provideNgxMask() ],
  bootstrap: [AppComponent],
})
export class AppModule {}
