import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm()
  }

  initLoginForm():void{
    this.loginForm = this.fb.group({
      email:['admin38@gmail.com' , [Validators.required , Validators.email] ],
      password:['12345' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
      role:['admin']
    })
  }

  login() {

    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token' , res.token);
        this.toaster.success("Login Successfully", "Success");
        this.router.navigate(['tasks']);
      }
    );
  }

}
