import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './../../services/users';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 1;
  totalPages: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.usersService.getUsers(page).subscribe((res) => {
      this.users = res.data;
      this.page = res.meta.pagination.page;
      this.totalPages = res.meta.pagination.pages;
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.loadUsers(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.loadUsers(this.page - 1);
    }
  }
}
