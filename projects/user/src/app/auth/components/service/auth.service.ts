import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:any = environment.baseApi.replace('tasks', 'auth')
  constructor(
    private httpClient: HttpClient,
  ) { }

  register(model: FormData){
    return this.httpClient.post( this.url + "/createAccount", model);
  }

  login(model: FormData){
    return this.httpClient.post( this.url + "/login", model);
  }
}
