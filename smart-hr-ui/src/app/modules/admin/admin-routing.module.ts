import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { ManageDepartmentsComponent } from 'src/app/components/admin/manage-departments/manage-departments.component';
import { ManageEmployeesComponent } from 'src/app/components/admin/manage-employees/manage-employees.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: ManageEmployeesComponent },
  { path: 'departments', component: ManageDepartmentsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
