import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  providers: [FormBuilder],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  username: string = '';
  password: string = '';

  login() {
    // Lógica para autenticarse con username y password
    if(this.loginForm.valid){
      this.router.navigateByUrl('/inicio');
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      //alert("Error al ingresar");
    }
  }
  

  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    pass: ["", Validators.required],
  });
  
  updateName() {
    this.loginForm.controls.email.setValue('Jose');
  }

  get email() {
    return this.loginForm.controls.email;
  }
  get pass() {
    return this.loginForm.controls.pass;
  }
  
  
}
