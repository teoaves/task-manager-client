import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { TaskSeriesScannerComponent } from "./task-series-scanner/task-series-scanner.component";
import { ManagetaskSeriesComponent } from "./manage-task-series/manage-task-series.component";

export const taskSeriesRoutes: Routes = [
  {
    path: 'manage-task-series', canActivate: [AuthenticationGuard], component: ManagetaskSeriesComponent, data: {
      label: 'Manage task Series',
      role: 'ROLE_ADMIN'
    },
  },
  {
    path: 'task-series-scanner', canActivate: [AuthenticationGuard], component: TaskSeriesScannerComponent, data: {
      label: 'Scan task Series',
      role: 'ROLE_ADMIN,ROLE_USER',
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(taskSeriesRoutes)],
  exports: [RouterModule]
})
export class TaskSeriesScannerRoutingModule {

}
