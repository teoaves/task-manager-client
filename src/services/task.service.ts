import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TaskRequest } from "src/transport/task.request";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { CommonService } from './common.service';

@Injectable()
export class TaskService extends CommonService {

  private baseUrl = environment.BASE_URL + '/tasks'

  createTask(request: TaskRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-task', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updateTask(request: TaskRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-task?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-task', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchTasks(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-tasks')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchTasksSeriesCodes(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-tasks-series-codes')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getTasksList(request: TaskRequest) {
    return this.http.get(
      this.baseUrl + '/get-tasks-list',
      {
        params: this.constructParams(request, 'name,purchaseDateFrom,purchaseDateTo,taskSeriesCodesList')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-task-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

}
