import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-pagocuota',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagocuota.component.html',
  styleUrl: './pagocuota.component.css'
})
export class PagocuotaComponent implements OnInit{
  
  constructor(private loginService: LoginService, private router: Router ){

  }

  ngOnInit(): void {
    if (!this.loginService.currentUserLoginOn.getValue()) {
      this.router.navigateByUrl('/login')
    } else {
      
    }
  }

}
