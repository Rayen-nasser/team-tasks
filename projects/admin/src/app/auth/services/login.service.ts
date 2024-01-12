import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../module/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(model:Login){
    return this.http.post("https://crud-a3ps.onrender.com/auth/login", model)
  }
}
