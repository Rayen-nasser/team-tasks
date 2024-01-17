import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface ChangeStatus{
  id: string,
  status: string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userDate = new BehaviorSubject({})

  constructor(
    private http: HttpClient
  ) { }

  url = environment.baseApi.replace('tasks', 'auth')

  getAll(tasksFilter?: any ){
    let params = new HttpParams()
    if(tasksFilter){
      Object.entries(tasksFilter).forEach(([key, value] : any) => {
        if(value){
          params = params.append(key, value)
        }
      })
    }
    return this.http.get( this.url + '/users', {params});
  }

  delete(id: string){
    return this.http.delete( this.url + `/user/${id}` )
  }

  changeStatus(model: ChangeStatus){
    return this.http.put( environment.baseApi.replace('tasks', 'auth') +  "/user-status", model)
  }

  getUsersData(model?: any) {
    this.getAll(model).subscribe((res: any) => {
      this.userDate.next({
        data: res.users,
        total: res.totalItems
      })
    });
  }
}
