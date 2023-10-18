import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
