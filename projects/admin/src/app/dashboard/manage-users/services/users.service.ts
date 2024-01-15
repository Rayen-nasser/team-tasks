import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  url = environment.baseApi.replace('tasks', 'auth')

  getAll(){
    return this.http.get( this.url + '/users');
  }

  delete(id: string){
    return this.http.delete( this.url + `/user/${id}` )
  }
}
