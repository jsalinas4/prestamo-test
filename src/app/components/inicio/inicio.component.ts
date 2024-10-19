import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  user?: User;
  constructor(private loginService: LoginService, private router: Router){
    
  }

  ngOnInit(): void {

    if (!this.loginService.currentUserLoginOn.getValue()) {
      this.router.navigateByUrl('/login')
    } else {
      this.loginService.userinfo().subscribe({
        next: (data)=>{
          this.user = {
            clientId: 0, // Asignar un valor por defecto o dejar como null
            clientType: '', // Asignar un valor por defecto o dejar como null
            firstName: data.firstName, // Asignar un valor por defecto o dejar como null
            lastName: data.lastName, // Asignar un valor por defecto o dejar como null
            dniRuc: '', // Asignar un valor por defecto o dejar como null
            address: '', // Asignar un valor por defecto o dejar como null
            phone: '', // Asignar un valor por defecto o dejar como null
            email: '' // Asignar el valor del email
          };
        }
      })
    }
  }

  logout(): void{
    this.loginService.logout();
    this.router.navigateByUrl('/login')
  }
}
