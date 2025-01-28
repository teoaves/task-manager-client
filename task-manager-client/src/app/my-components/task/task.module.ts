import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { TaskRoutingModule } from "./task-routing.module";
import { ManageTaskComponent } from "./manage-task.component";
import { TaskFormPopupComponent } from './task-form-popup/task-form-popup.component';


@NgModule({
  declarations: [
    ManageTaskComponent,
    TaskFormPopupComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
  ],
})
export class TaskModule { }

