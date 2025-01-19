import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/services/task.service';
import { TaskRequest } from 'src/transport/task.request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-task-form-popup',
  templateUrl: './task-form-popup.component.html',
  providers: [TaskService],
})
export class TaskFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  id: any;
  taskPurchaseDate: Date;
  form: UntypedFormGroup;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new TaskRequest();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      taskName: [null, Validators.required],
      taskDescription: [null],
      taskRef: [null, Validators.required],
      taskLot: [null, Validators.required],
      taskManufacturer: [null, Validators.required],
      taskPurchaseDate: [null, Validators.required],
      taskNotes: [null],
    });

    if (this.id) {
      this.subscriptions.add(this.taskService.getTaskById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              taskName: [res.name, Validators.required],
              taskDescription: [res.description],
              taskRef: [res.taskRef, Validators.required],
              taskLot: [res.taskLot, Validators.required],
              taskManufacturer: [res.taskManufacturer, Validators.required],
              taskPurchaseDate: [res.taskPurchaseDate, Validators.required],
              taskNotes: [res.taskNotes]
            });
          }
        }));
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSavetask() {
    this.req.$id = this.id;
    this.req.$name = this.form.value.taskName;
    this.req.$description = this.form.value.taskDescription;
    this.req.$taskRef = this.form.value.taskRef;
    this.req.$taskLot = this.form.value.taskLot;
    this.req.$taskManufacturer = this.form.value.taskManufacturer;
    this.req.$taskPurchaseDate = this.form.value.taskPurchaseDate;
    this.req.$taskNotes = this.form.value.taskNotes;
    if (this.id) {
      this.subscriptions.add(this.taskService.updateTask(this.req).subscribe(
        res => {
          this.dialogRef.close(this.id);
        }
      ));
    } else {
      this.subscriptions.add(this.taskService.createTask(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
