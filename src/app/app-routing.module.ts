import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { ExamComponent } from './pages/exam/exam.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DietComponent } from './pages/diet/diet.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { PatientMedicalRecordComponent } from './pages/patient-medical-record/patient-medical-record.component';
import { connectionGuard } from './shared/guards/connection.guard';
import { adminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [connectionGuard],
    children: [
      {
        path: '',
        component: StatsComponent,
      },
      {
        path: 'exercicios',
        component: ExerciseComponent,
      },
      {
        path: 'dietas',
        component: DietComponent,
      },
      {
        path: 'pacientes',
        component: PatientComponent,
      },
      {
        path: 'exames',
        component: ExamComponent,
      },
      {
        path: 'usuarios',
        component: UserComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'prontuarios',
        component: MedicalRecordsComponent,
      },
      {
        path: 'prontuarios/:patientId',
        component: PatientMedicalRecordComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
