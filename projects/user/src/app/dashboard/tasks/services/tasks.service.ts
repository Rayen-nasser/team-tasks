import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(id: string, tasksParams: any){
    let params = new HttpParams()
    Object.entries(tasksParams).forEach(([key, value]: any) => {
      params = params.append(key, value)
    })
    return this.http.get(environment.baseApi + "/user-tasks/" + id, {params})
  }

  complete(model: object){
    return this.http.put(environment.baseApi +  "/complete" , model)
  }

  getTaskDetails(id: string){
    return this.http.get(environment.baseApi + "/task/" + id)
  }
}
