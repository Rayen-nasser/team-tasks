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
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initLoginForm()
  }

  initLoginForm():void{
    this.loginForm = this.fb.group({
      email:['' , [Validators.required , Validators.email] ],
      password:['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
      role:['admin']
    })
  }

  login() {
    this.spinner.show()
    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.spinner.hide()
        localStorage.setItem('token' , res.token);
        this.toaster.success("Login Successfully", "Success");
        this.router.navigate(['tasks']);
      },
      (err) => {
        this.spinner.hide()
        this.toaster.error("An error occurred during login. Please try again.", "Error");
      }
    );
  }

}
