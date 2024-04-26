import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialForm()
  }

  initialForm(){
    this.loginForm = this.fb.group({
      email : ["user@gmail.com", [Validators.required , Validators.email]],
      password : ["user12345", [Validators.required , Validators.minLength(8)]]
    })
  }

  login() {
    if (this.loginForm.invalid) return;
    const model = this.createFormDate()
    this.service.login(model).subscribe((res: any) => {
      localStorage.setItem("tokenId" , res["token"])
      this.toaster.success("Login Successfully 😉")
      this.router.navigate(['tasks'])
    },(error) => {
      console.log( error.error.message);
    })
  }


  createFormDate(): FormData{
    let formData = new FormData();
    Object.entries(this.loginForm.value).forEach(([key, value]: any)=> {
      formData.append(key, value);
    })
    formData.append("role", "user")

    return formData
  }
}
