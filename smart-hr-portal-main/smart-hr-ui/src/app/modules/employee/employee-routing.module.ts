import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/employee/dashboard/dashboard.component';
import { MyTasksComponent } from 'src/app/components/employee/my-tasks/my-tasks.component';
import { ProfileComponent } from 'src/app/components/employee/profile/profile.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
