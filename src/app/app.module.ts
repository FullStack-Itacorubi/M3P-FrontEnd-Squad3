import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { HeaderComponent } from './shared/header/header.component';
import { DropdownComponent } from './shared/header/dropdown/dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavButtonComponent } from './components/sidebar/nav-button/nav-button.component';


@NgModule({
  declarations: [
     AppComponent,
     LayoutComponent, 
     SidebarComponent, 
     NavButtonComponent, 
     HeaderComponent, 
     DropdownComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ ...IonIcons }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
