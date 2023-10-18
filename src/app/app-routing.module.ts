import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExamComponent } from './pages/exam/exam.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DietComponent } from './pages/diet/diet.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { StatsComponent } from './pages/stats/stats.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
