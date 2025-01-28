import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { TaskSeriesScannerRoutingModule } from "./task-series-routing.module";
import { TaskSeriesScannerComponent } from "./task-series-scanner/task-series-scanner.component";
import { ManagetaskSeriesComponent } from './manage-task-series/manage-task-series.component';
import { TaskSeriesFormPopupComponent } from './task-series-form-popup/task-series-form-popup.component';
import { TaskSeriesDetailsPopupComponent } from "./task-series-detaills-popup/task-series-details-popup.component";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
  declarations: [
    ManagetaskSeriesComponent,
    TaskSeriesScannerComponent,
    TaskSeriesFormPopupComponent,
    TaskSeriesDetailsPopupComponent
   ],
  imports: [
    CommonModule,
    TaskSeriesScannerRoutingModule,
    SharedModule,
    QRCodeModule
  ],
})
export class TaskSeriesModule { }
