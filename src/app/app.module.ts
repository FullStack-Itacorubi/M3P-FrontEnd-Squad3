import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { HeaderComponent } from './shared/header/header.component';
import { DropdownComponent } from './shared/header/dropdown/dropdown.component';
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
import { ExerciseComponent } from './exercise/exercise.component';
import { DietComponent } from './pages/diet/diet.component';
import { PatientComponent } from './pages/patient/patient.component';
import { UserComponent } from './pages/user/user.component';
import { ExamComponent } from './pages/exam/exam.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GlobalHttpErrorHandlerInterceptor } from './middlewares/global-http-error-handler.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { GenericModalComponent } from './shared/components/generic-modal/generic-modal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';

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
    HeaderComponent,
    DropdownComponent,
    ExerciseComponent,
    DietComponent,
    PatientComponent,
    ExamComponent,
    UserComponent,
    LoginComponent,
    GenericModalComponent,
    ResetPasswordComponent,
    ContactAdminComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIconsModule.withIcons({ ...IonIcons }),
    ReactiveFormsModule,
    NgxMaskDirective,
    HttpClientModule,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
