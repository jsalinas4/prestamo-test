import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { LoginRequest } from '../../models/loginRequest';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  providers: [FormBuilder],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  username: string = '';
  password: string = '';
  loginError:string="";

  login() {
    // Lógica para autenticarse con username y password
    if(this.loginForm.valid){
      //this.router.navigateByUrl('/inicio');
      //this.loginForm.reset();


      const loginRequest: LoginRequest = {
        email: this.loginForm.value.username ?? '',  // Usamos el email transformado en lugar del username
        password: this.loginForm.value.password ?? ''
      };

      console.log(loginRequest)
      this.loginError="";
      this.loginService.login(loginRequest).subscribe({
        next: (userData) => {
          //console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
      //alert("Error al ingresar");
    }
  }
  

  loginForm = this.formBuilder.group({
    username: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });
  
  updateName() {
    this.loginForm.controls.username.setValue('Jose');
  }

  get email() {
    return this.loginForm.controls.username;
  }
  get pass() {
    return this.loginForm.controls.password;
  }
  
  
}
