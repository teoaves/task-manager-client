import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-series-details-popup',
  templateUrl: './task-series-details-popup.component.html',
})
export class TaskSeriesDetailsPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskSeriesDetailsPopupComponent>) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  onClose() {
    this.dialogRef.close();
  }
}
