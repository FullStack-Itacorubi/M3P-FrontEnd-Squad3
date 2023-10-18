import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: StatsComponent,
      },
    ],
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
