import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskSeriesService } from 'src/services/task-series.service';
import { NotificationService } from 'src/services/notification.service';
import { TaskSeriesRequest } from 'src/transport/task-series.request';
import { GenericComponent } from '../../generic.component';
import { VerificationPopupComponent } from '../../verification-popup/verification-popup.component';
import { TaskSeriesFormPopupComponent } from '../task-series-form-popup/task-series-form-popup.component';

@Component({
  selector: 'app-manage-task-series',
  templateUrl: './manage-task-series.component.html',
  providers: [TaskSeriesService]
})
export class ManagetaskSeriesComponent extends GenericComponent implements OnInit, OnDestroy {
  itemsPerPage: number = 9;
  allPages: number;
  tempList: any = [];

  constructor(
    private dialog: MatDialog,
    private taskSeriesService: TaskSeriesService,
    private notificationService: NotificationService
  ) {
    super();
    this.req = new TaskSeriesRequest();
    this.req.$paging.$pageSize = 10;
  }

  ngOnInit() {
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.taskSeriesService.gettaskSeriesList(this.req)
      .subscribe(res => {
        this.modelList = res;
        this.tempList = res;
        this.onPageChange(1);
        this.allPages = Math.ceil(this.tempList.length / this.itemsPerPage);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onForm(id?: any) {
    const dialogRef = this.dialog.open(TaskSeriesFormPopupComponent, { disableClose: true, maxHeight: '100vh', width: '80vw', panelClass: 'custom-task-series-form-dialog-container' });
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your task series has been saved',
          });
      }
    });
  }

  onDeletetaskSeries(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete task Series " +
          ' "' + this.selectedRow.
          taskSeriesCode + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.taskSeriesService.deletetaskSeries(id)
          .subscribe(res => {
            if (res) {
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

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onPageChange(page: number): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.modelList = this.tempList.slice(startItem, endItem);
  }
}
