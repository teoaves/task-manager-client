import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QRCodeElementType } from 'angularx-qrcode';
import { TaskSeriesService,  } from 'src/services/task-series.service';
import { TaskSeriesRequest } from 'src/transport/task-series.request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-task-series-form-popup',
  templateUrl: './task-series-form-popup.component.html',
  providers: [TaskSeriesService]
})
export class TaskSeriesFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  id: number;
  lastSelected: number;
  start: number;
  end: number;
  selected1taskSet: Set<number> = new Set();
  selected2taskSet: Set<number> = new Set();
  connectedTasksIds: Array<any> = [];
  filteredconnectedTasksIds: Array<any> = [];
  unconnectedTasksIds: Array<any> = [];
  filteredUnconnectedTasksIds: Array<any> = [];
  isAscUnconnectedTasksIds = false;
  isAscconnectedTasksIds = false;
  showInput: boolean = true;
  showGenerateQrButton = true;
  showQrCode: boolean = false;
  elementType = "canvas" as QRCodeElementType

  constructor(private taskSeriesService: TaskSeriesService,
    private dialogRef: MatDialogRef<TaskSeriesFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new TaskSeriesRequest();
  }

  ngOnInit(): void {

    this.subscriptions.add(this.taskSeriesService.fetchAvailabletasks().subscribe((data) => {
      this.sort(data, true);
      this.unconnectedTasksIds = data;
      this.filteredUnconnectedTasksIds = data;
    }));

    this.form = this.formBuilder.group({
      taskSeriesCode: [null, Validators.required],
      filteredUnConnectedtask: [null],
      filteredConnectedtask: [null],
    });

    if (this.id) {
      // Fetch data from service
      this.subscriptions.add(this.taskSeriesService.getById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              taskSeriesCode: [res[0].taskSeriesCode, Validators.required],
              filteredUnConnectedtask: [null],
              filteredConnectedtask: [null],
            });
            this.hideInputButtonShowQrCode();
            if (res[0].id != null) {
              for (const item of res) {
                this.connectedTasksIds.push(item);
              }
              this.filteredconnectedTasksIds = this.connectedTasksIds;
            }
          }
        }));
    }
  }

  hideInputButtonShowQrCode() {
    this.showInput = false;
    this.showGenerateQrButton = false;
    this.showQrCode = true;
  }

  hideQrCodeShowInputButton() {
    this.showQrCode = false;
    this.showInput = true;
    this.showGenerateQrButton = true;
    this.form.controls.taskSeriesCode.patchValue('');
  }

  onSelectRowtask(recordId: number, list: number, index: number, event?: any): void {
    // event ctrl +click
    if (event && event.ctrlKey) {
      this.lastSelected = index;
      if (list === 0) {
        (!this.selected1taskSet.has(recordId))
          ? (this.selected1taskSet.add(recordId))
          : (this.selected1taskSet.delete(recordId));
      } else {
        (!this.selected2taskSet.has(recordId))
          ? (this.selected2taskSet.add(recordId))
          : (this.selected2taskSet.delete(recordId));
      }
    }
    // event shift + click
    else if (event && event.shiftKey) {
      if (index < this.lastSelected) {
        this.start = index;
        this.end = this.lastSelected;
      } else {
        this.start = this.lastSelected;
        this.end = index;
      }
      if (list === 0) {
        for (let k = 0; k <= this.filteredUnconnectedTasksIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected1taskSet.add(this.filteredUnconnectedTasksIds[k].id);
          }
        }
      } else {
        for (let k = 0; k <= this.filteredconnectedTasksIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected2taskSet.add(this.filteredconnectedTasksIds[k].id);
          }
        }
      }
    } else {
      // click event
      this.lastSelected = index;
      if (list === 0) {
        if (this.selected1taskSet.size === 0) {
          if (!this.selected1taskSet.has(recordId)) {
            this.selected1taskSet.add(recordId);
          }
        } else {
          // if selected1tasket has one value and click different value
          this.selected1taskSet.clear();
          this.selected1taskSet.add(recordId);
        }
      } else {
        //  for  list 1
        if (this.selected2taskSet.size === 0) {
          if (!this.selected2taskSet.has(recordId)) {
            this.selected2taskSet.add(recordId);
          }
        } else {
          // if selected2nstrumentSet has one value and click different value
          this.selected2taskSet.clear();
          this.selected2taskSet.add(recordId);
        }
      }
    }
  }

  onMovetask(direction: string, event?: any) {
    // because onMovetask is used without click event when edit pop up
    // it runs only for user click.
    if (event != null && event.type === 'click') {
      this.form.markAsDirty();
    }
    this.lastSelected = 0;
    this.start = 0;
    this.end = 0;
    const remainingsAddress: Array<any> = [];

    if (direction === 'RIGHT') {
      this.unconnectedTasksIds.forEach(rec => {
        if (this.selected1taskSet.has(rec.id) && !this.recordExists(this.connectedTasksIds, rec.id)) {
          this.connectedTasksIds.push(rec);
          this.selected1taskSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.unconnectedTasksIds = remainingsAddress;
      this.filteredUnconnectedTasksIds = remainingsAddress;
      this.filteredconnectedTasksIds = this.connectedTasksIds;
      this.filterUnconnectedTasksIds(
        this.form.value.filteredUnConnectedtask ? this.form.value.filteredUnConnectedtask : '');
      this.filterconnectedTasksIds(
        this.form.value.filteredConnectedtask ? this.form.value.filteredConnectedtask : '');
    } else {
      this.connectedTasksIds.forEach(rec => {
        if (this.selected2taskSet.has(rec.id) && !this.recordExists(this.unconnectedTasksIds, rec.id)) {
          this.unconnectedTasksIds.push(rec);
          this.selected2taskSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.connectedTasksIds = remainingsAddress;
      this.filteredconnectedTasksIds = remainingsAddress;
      this.filterUnconnectedTasksIds(
        this.form.value.filteredUnConnectedtask ? this.form.value.filteredUnConnectedtask : '');
      this.filterconnectedTasksIds(
        this.form.value.filteredConnectedtask ? this.form.value.filteredConnectedtask : '');
    }
    this.sort(this.filteredconnectedTasksIds, true);
    this.sort(this.filteredUnconnectedTasksIds, true);
  }

  private recordExists(list: any[], id: number): boolean {
    for (const item of list) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  sort(list: Array<any>, isAsc: boolean) {
    console.log(list, isAsc)
    if (isAsc) {
      list.sort((one, two) => (one.name < two.name ? -1 : 1));
    } else {
      list.sort((one, two) => (one.name < two.name ? 1 : -1));
    }
  }

  isSelectedtask(record: any, list: number): boolean {
    if (list === 0) {
      return this.selected1taskSet.has(record.id);
    } else {
      return this.selected2taskSet.has(record.id);
    }
  }

  filterUnconnectedTasksIds(search: any) {
    this.selected1taskSet.clear();
    this.filteredUnconnectedTasksIds = this.unconnectedTasksIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  filterconnectedTasksIds(search: any) {
    this.selected2taskSet.clear();
    this.filteredconnectedTasksIds = this.connectedTasksIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  onSavetaskSeries() {
    // assign the form values to request
    this.req.$taskSeriesCode = this.form.value.taskSeriesCode;
    for (const item of this.unconnectedTasksIds) {
      this.req.$unconnectedTasksIds.push(item.id);
    }
    for (const item of this.connectedTasksIds) {
      this.req.$connectedTasksIds.push(item.id);
    }
    // call service for create / edit
    if (this.id) {
      this.req.$id = this.id;
      this.subscriptions.add(this.taskSeriesService.updatetaskSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    } else {
      this.subscriptions.add(this.taskSeriesService.createtaskSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  onSelect(recordId: number, list: number, tempSelectedOne: Set<number>, tempSelectedTwo: Set<number>) {
    if (list === 0) {
      if (tempSelectedOne.size === 0) {
        if (!tempSelectedOne.has(recordId)) {
          tempSelectedOne.add(recordId);
        }
      } else {
        tempSelectedOne.add(recordId);
      }
    } else {
      //  for  list 1
      if (tempSelectedTwo.size === 0) {
        if (!tempSelectedTwo.has(recordId)) {
          tempSelectedTwo.add(recordId);
        }
      } else {
        tempSelectedTwo.add(recordId);
      }
    }
  }

  saveAsImage(parent: any) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "Qrcode_" + this.form.controls.taskSeriesCode.value;
      link.click()
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
