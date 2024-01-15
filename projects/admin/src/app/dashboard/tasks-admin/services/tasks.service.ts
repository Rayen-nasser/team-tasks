import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTasks(tasksFilter: any){
    let params = new HttpParams()

    Object.entries(tasksFilter).forEach(([key, value] : any) => {
      if(value){
        params = params.append(key, value)
      }
    })
   
    return this.http.get( environment.baseApi +'/all-tasks', {params})
  }

  addTask(newTask: any){
    return this.http.post( environment.baseApi +'/add-task', newTask)
  }

  deleteTask(id: string){
    return this.http.delete( environment.baseApi + '/delete-task/'+ id)
  }

  editTask(id: string, model: any ){
    return this.http.put( environment.baseApi + '/edit-task/'+ id, model)
  }
}
