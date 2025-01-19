import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ManageTaskComponent } from "./manage-task.component";

export const taskRoutes: Routes = [
  {
    path: 'manage-task', canActivate: [AuthenticationGuard], component: ManageTaskComponent, data: {
      label: 'Manage tasks',
      role: 'ROLE_ADMIN'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(taskRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
