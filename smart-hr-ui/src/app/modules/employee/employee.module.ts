import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from 'src/app/components/employee/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/employee/profile/profile.component';
import { MyTasksComponent } from 'src/app/components/employee/my-tasks/my-tasks.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    MyTasksComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
