import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from 'src/app/components/manager/dashboard/dashboard.component';
import { TeamViewComponent } from 'src/app/components/manager/team-view/team-view.component';
import { UploadReportComponent } from 'src/app/components/manager/upload-report/upload-report.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    TeamViewComponent,
    UploadReportComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule 
  ]
})
export class ManagerModule { }
