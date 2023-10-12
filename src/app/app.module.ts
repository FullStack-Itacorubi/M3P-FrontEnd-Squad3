import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { HeaderComponent } from './shared/header/header.component';
import { DropdownComponent } from './shared/header/dropdown/dropdown.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent, DropdownComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ ...IonIcons }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
