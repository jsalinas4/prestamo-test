

import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Lógica para autenticarse con username y password
    alert(`Inicio de sesión para ${this.username}`);
  }

  
}
