import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService} from '../../services/user.service';
import { NgFor } from '@angular/common';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-listaprestamos',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './listaprestamos.component.html',
  styleUrl: './listaprestamos.component.css'
})
export class ListaprestamosComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (!this.loginService.currentUserLoginOn.getValue()) {
      this.router.navigateByUrl('/login')
    } else {
      this.loadUsers();
    }
    
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

}
