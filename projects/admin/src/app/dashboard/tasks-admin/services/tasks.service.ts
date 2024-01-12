import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTasks(){
    return this.http.get('https://crud-a3ps.onrender.com/tasks/all-tasks')
  }

  addTask(newTask: any){
    return this.http.post('https://crud-a3ps.onrender.com/tasks/add-task', newTask)
  }
}
