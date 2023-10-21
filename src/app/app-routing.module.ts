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
import { QueryComponent } from './pages/query/query.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
      },
      {
        path: 'prontuarios',
        component: MedicalRecordsComponent,
      },
      {
        path: 'consultas',
        component: QueryComponent,
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
