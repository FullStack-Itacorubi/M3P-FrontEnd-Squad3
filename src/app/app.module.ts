import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavButtonComponent } from './components/sidebar/nav-button/nav-button.component';
import { StatsComponent } from './pages/stats/stats.component';
import { StatsCardComponent } from './components/stats/stats-card/stats-card.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { PatientsCardComponent } from './components/stats/patients-card/patients-card.component';
import { StatsListComponent } from './components/stats/stats-list/stats-list.component';
import { StatsTableRowComponent } from './components/stats/stats-table-row/stats-table-row.component';
import { DelaySearchInputComponent } from './components/delay-search-input/delay-search-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    NavButtonComponent,
    StatsComponent,
    StatsCardComponent,
    TabMenuComponent,
    PatientsCardComponent,
    StatsListComponent,
    StatsTableRowComponent,
    DelaySearchInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIconsModule.withIcons({ ...IonIcons }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
