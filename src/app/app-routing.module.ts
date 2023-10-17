import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DietComponent } from './pages/diet/diet.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: "dietas",
      component: DietComponent,
    }]
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'dietas',
    component: DietComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
