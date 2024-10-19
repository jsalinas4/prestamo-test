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
    const login = this.loginService.checkToken();
    if (!login) {
      this.router.navigateByUrl('/login')
    } else {
      
    }
  }

  logout(): void{
    this.loginService.logout();
    this.router.navigateByUrl('/login')
  }
}
