import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  passwordConfirm!: string

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
    this.registerForm = this.fb.group({
      username : ["", [Validators.required , Validators.minLength(5)]],
      email : ["", [Validators.required , Validators.email]],
      password : ["", [Validators.required , Validators.minLength(8)]],
      passwordConfirm : ["", [Validators.required , Validators.minLength(8)]]
    })
  }

  createAccount() {
    const { password, passwordConfirm, ...userData } = this.registerForm.value;

    if (password === passwordConfirm) {
      const formData = this.createFormData(this.registerForm.value);

      this.registerUser(formData);
    } else {
      this.handlePasswordMismatchError();
    }
  }

  createFormData(userData: any): FormData {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    formData.append("role", "user");

    return formData;
  }

  registerUser(formData: FormData) {
    this.service.register(formData).subscribe(
      (res: any) => {
        this.handleRegistrationSuccess(res);
        this.router.navigate(['tasks'])
      }
    );
  }

  handleRegistrationSuccess(res: any) {
    this.toaster.success("Register successfully");
    localStorage.setItem('token', res.token);
  }


  handlePasswordMismatchError() {
    this.toaster.error('Error', 'Password does not match');
  }

}
