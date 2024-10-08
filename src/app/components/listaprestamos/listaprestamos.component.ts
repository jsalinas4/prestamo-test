import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listaprestamos',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './listaprestamos.component.html',
  styleUrl: './listaprestamos.component.css'
})
export class ListaprestamosComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

}
