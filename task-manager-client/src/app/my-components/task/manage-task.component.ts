import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { Field } from 'src/transport/helper/table-fields.helper';
import { TaskRequest } from 'src/transport/task.request';
import { GenericComponent } from '../generic.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormPopupComponent } from './task-form-popup/task-form-popup.component';
import { NotificationService } from 'src/services/notification.service';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';


@Component({
  selector: 'app-task-table',
  templateUrl: './manage-task.component.html',
  providers: [TaskService]
})
export class ManageTaskComponent extends GenericComponent implements OnInit, OnDestroy {
  filterOpened = false;
  taskList: any = [];
  filteredTaskList: any = [];
  taskSeriesCodesList: any = [];
  filteredTaskSeriesCodesList: any = [];
  dateFrom: Date;
  dateTo: Date;
  maxDate: Date;
  minDateFrom: Date;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    public datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    super();
    this.onReset();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.taskService.fetchTasks().subscribe((data) => {
      this.taskList = data;
      this.filteredTaskList = data;
    }));
    this.subscriptions.add(this.taskService.fetchTasksSeriesCodes().subscribe((data) => {
      this.taskSeriesCodesList = data;
      this.filteredTaskSeriesCodesList = data;
    }));
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.taskService.getTasksList(this.req)
      .subscribe(res => {
        this.modelList = res.content;
        this.req.$paging.$totalSize = res.totalElements;
      }));
  }

  onSearch() {
    this.req.$purchaseDateFrom = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd') as string;
    this.req.$purchaseDateTo = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd') as string;
    this.onList();
  }

  onReset() {
    this.filteredTaskList = this.taskList;
    this.filteredTaskSeriesCodesList = this.taskSeriesCodesList
    this.req = new TaskRequest();
    this.req.$paging.$pageSize = 10;
    this.req.$paging.$orderField = Field.TASK_NAME;
    this.req.$paging.$orderDirection = 'DESC';
    this.onList();
  }

  onDatePicker(event: any) {
    this.dateTo = null as any;
    if (event != null && this.dateFrom === null) {
      const tempDay = new Date();
      tempDay.setFullYear(event.getFullYear());
      tempDay.setMonth(event.getMonth());
      tempDay.setDate(event.getDate());
      this.minDateFrom = new Date(
        tempDay.setMonth(tempDay.getMonth() - 1)
      );
    }
  }
  onForm(id?: any) {
    const dialogRef = this.dialog.open(TaskFormPopupComponent, { disableClose: true, panelClass: 'custom-form-dialog-container' },);
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.taskService.fetchTasks().subscribe((data) => {
          this.taskList = data;
          this.filteredTaskList = data;
        }));
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your task has been saved',
          });
      }
    });
  }

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onDeletetask(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete" +
          ' "' + this.selectedRow.name + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.taskService.deleteTask(id)
          .subscribe(res => {
            if (res) {
              this.subscriptions.add(this.taskService.fetchTasks().subscribe((data) => {
                this.taskList = data;
                this.filteredTaskList = data;
              }));
              this.onList();
              this.notificationService.showNotification(
                {
                  title: 'Delete',
                  type: 'SUCCESS',
                  message: 'Your task has been deleted',
                });
            }
          }));
      }
    });
  }

  filterTaskList(search: any) {
    this.filteredTaskList = this.taskList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase().toString()));
  }


  filterTaskSeriesCodesList(search: any) {
    this.filteredTaskSeriesCodesList = this.taskSeriesCodesList.filter((item: any) => String(item.taskSeriesCode).toLowerCase().includes(search.toLowerCase()))
  }

  onChangePaging(changePaging: any): void {
    this.req.$paging = changePaging;
    this.onList();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
