import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExamComponent } from './pages/exam/exam.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[{
      path:"exames",
      component: ExamComponent,
    }]
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'exames',
    component: ExamComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
