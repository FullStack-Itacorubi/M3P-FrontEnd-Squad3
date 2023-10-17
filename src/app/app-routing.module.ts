import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExerciseComponent } from './exercise/exercise.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[{
      path:"exercicios",
      component: ExerciseComponent,
    }]  
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'exercicios',
    component: ExerciseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
