import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TaskSeriesRequest } from "src/transport/task-series.request";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";
import { HttpParams } from "@angular/common/http";
 


@Injectable()
export class TaskSeriesService extends CommonService {

  private baseUrl = environment.BASE_URL + '/tasks-series'


  createtaskSeries(request: TaskSeriesRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-task-series', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }//
  
  gettaskSeriesList(request: TaskSeriesRequest) {
    return this.http.get(
      this.baseUrl + '/get-task-series-list',
      {
        params: this.constructParams(request, '')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  getById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-task-series-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updatetaskSeries(request: TaskSeriesRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-task-series?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deletetaskSeries(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-task-series', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchtasksBytaskSeriesCode(qrCode: string): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-tasks-by-task-series-code', {
        params: new HttpParams().set('qrCode', qrCode),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchAvailabletasks(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-available-tasks')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
