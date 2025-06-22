import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/manager/dashboard/dashboard.component';
import { TeamViewComponent } from 'src/app/components/manager/team-view/team-view.component';
import { UploadReportComponent } from 'src/app/components/manager/upload-report/upload-report.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'team', component: TeamViewComponent },
  { path: 'upload-report', component: UploadReportComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
