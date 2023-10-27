import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import * as IonIcons from '@ng-icons/ionicons';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownComponent } from './shared/components/header/dropdown/dropdown.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavButtonComponent } from './shared/components/sidebar/nav-button/nav-button.component';
import { StatsComponent } from './pages/stats/stats.component';
import { StatsCardComponent } from './components/stats/cards/stats-card/stats-card.component';
import { TabMenuComponent } from './shared/components/tab-menu/tab-menu.component';
import { PatientCardComponent } from './components/stats/cards/patient-card/patient-card.component';
import { DashboardUsersListComponent } from './components/stats/dashboard-users-list/dashboard-users-list.component';
import { PatientTableRowComponent } from './components/stats/tables/patient-table-row/patient-table-row.component';
import { DelaySearchInputComponent } from './shared/components/delay-search-input/delay-search-input.component';
import { FormsModule } from '@angular/forms';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { DietComponent } from './pages/diet/diet.component';
import { PatientComponent } from './pages/patient/patient.component';
import { UserComponent } from './pages/user/user.component';
import { ExamComponent } from './pages/exam/exam.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GlobalHttpErrorHandlerInterceptor } from './shared/middlewares/global-http-error-handler.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { GenericModalComponent } from './shared/components/generic-modal/generic-modal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { AccordionComponent } from './shared/components/accordion/accordion.component';
import { MedicalRecordsCardComponent } from './components/medical-records/medical-records-card/medical-records-card.component';
import { QueryComponent } from './pages/query/query.component';
import { PatientMedicalRecordComponent } from './pages/patient-medical-record/patient-medical-record.component';
import { CustomButtonComponent } from './shared/components/custom-button/custom-button.component';
import { FormButtonsComponent } from './shared/components/form-buttons/form-buttons.component';
import { MedicamentModalComponent } from './components/medicament-modal/medicament-modal.component';
import { UserCardComponent } from './components/stats/cards/user-card/user-card.component';
import { PatientTableHeaderComponent } from './components/stats/tables/patient-table-header/patient-table-header.component';
import { UserTableHeaderComponent } from './components/stats/tables/user-table-header/user-table-header.component';
import { UserTableRowComponent } from './components/stats/tables/user-table-row/user-table-row.component';
import { LogsComponent } from './pages/logs/logs.component';
import { LogsTableRowComponent } from './components/logs-table-row/logs-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    NavButtonComponent,
    StatsComponent,
    StatsCardComponent,
    TabMenuComponent,
    PatientCardComponent,
    DashboardUsersListComponent,
    PatientTableRowComponent,
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
    MedicamentsComponent,
    MedicalRecordsComponent,
    AccordionComponent,
    MedicalRecordsCardComponent,
    QueryComponent,
    PatientMedicalRecordComponent,
    CustomButtonComponent,
    FormButtonsComponent,
    MedicamentModalComponent,
    UserCardComponent,
    PatientTableHeaderComponent,
    UserTableHeaderComponent,
    UserTableRowComponent,
    LogsComponent,
    LogsTableRowComponent,
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
