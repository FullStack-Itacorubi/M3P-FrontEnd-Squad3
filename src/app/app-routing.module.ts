import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PatientComponent } from './pages/patient/patient.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[{
      path:"pacientes",
      component: PatientComponent,
    }]
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: ' pacientes',
    component: PatientComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
