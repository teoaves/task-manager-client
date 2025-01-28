import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskSeriesService } from 'src/services/task-series.service';
import { GenericComponent } from '../../generic.component';
import { TaskSeriesDetailsPopupComponent } from '../task-series-detaills-popup/task-series-details-popup.component';

@Component({
  selector: 'app-task-series-scanner',
  templateUrl: './task-series-scanner.component.html',
  providers: [TaskSeriesService]

})
export class TaskSeriesScannerComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(
    private taskSeriesService: TaskSeriesService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onFetchtasksBytaskSeriesCode(qrCode: string) {
    this.subscriptions.add(this.taskSeriesService.fetchtasksBytaskSeriesCode(qrCode)
      .subscribe(res => {
        this.modelList = res;
        this.ontaskSeriesDetails()
      }
      )
    );
  }

  ontaskSeriesDetails() {
    const dialogRef = this.dialog.open(TaskSeriesDetailsPopupComponent, {
      panelClass: 'custom-form-dialog-container',
      data:
      {
        item: this.modelList
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
