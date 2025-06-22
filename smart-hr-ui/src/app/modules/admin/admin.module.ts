import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { ManageEmployeesComponent } from 'src/app/components/admin/manage-employees/manage-employees.component';
import { ManageDepartmentsComponent } from 'src/app/components/admin/manage-departments/manage-departments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageEmployeesComponent,
    ManageDepartmentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
