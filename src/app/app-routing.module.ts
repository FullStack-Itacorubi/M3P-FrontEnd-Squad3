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
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { QueryComponent } from './pages/query/query.component';
import { PatientMedicalRecordComponent } from './pages/patient-medical-record/patient-medical-record.component';
import { connectionGuard } from './shared/guards/connection.guard';
import { adminGuard } from './shared/guards/admin.guard';
import { doctorGuard } from './shared/guards/doctor.guard';
import { LogsComponent } from './pages/logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [connectionGuard],
    children: [
      {
        path: '',
        component: StatsComponent,
        title: 'Dashboard',
      },
      {
        path: 'consultas',
        component: QueryComponent,
        canActivate: [doctorGuard],
        title: 'Consultas',
      },
      {
        path: 'consultas/:queryId',
        component: QueryComponent,
        canActivate: [doctorGuard],
        title: 'Consultas',
      },
      {
        path: 'exercicios',
        component: ExerciseComponent,
        title: 'Exercícios',
      },
      {
        path: 'exercicios/:exerciseId',
        component: ExerciseComponent,
        title: 'Exercícios',
      },
      {
        path: 'dietas',
        component: DietComponent,
        title: 'Dietas',
      },
      {
        path: 'dietas/:dietId',
        component: DietComponent,
        title: 'Dietas',
      },
      {
        path: 'pacientes',
        component: PatientComponent,
        title: 'Pacientes',
      },
      {
        path: 'pacientes/:patientId',
        component: PatientComponent,
        title: 'Pacientes',
      },
      {
        path: 'exames',
        component: ExamComponent,
        canActivate: [doctorGuard],
        title: 'Exames',
      },
      {
        path: 'exames/:examId',
        component: ExamComponent,
        canActivate: [doctorGuard],
        title: 'Exames',
      },
      {
        path: 'usuarios',
        component: UserComponent,
        canActivate: [adminGuard],
        title: 'Usuários',
      },
      {
        path: 'usuarios/:userId',
        component: UserComponent,
        canActivate: [adminGuard],
        title: 'Usuários',
      },
      {
        path: 'prontuarios',
        component: MedicalRecordsComponent,
        title: 'Prontuários',
      },
      {
        path: 'prontuarios/:patientId',
        component: PatientMedicalRecordComponent,
        title: 'Prontuários',
      },
      {
        path: 'medicamentos',
        component: MedicamentsComponent,
        title: 'Medicamentos',
      },
      {
        path: 'medicamentos/:medicamentId',
        component: MedicamentsComponent,
        title: 'Medicamentos',
      },
      {
        path: 'logs',
        component: LogsComponent,
        canActivate: [adminGuard],
      }
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
