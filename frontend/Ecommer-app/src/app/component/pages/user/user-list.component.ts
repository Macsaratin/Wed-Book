import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: any[] = []; 

  constructor(private readonly userService: UserService) {}

    ngOnInit() {
        this.getAllUser();
    }
    async getAllUser() {
        try {
            const response = await this.userService.getList();
            this.users = response?.content || [];        
        } catch (error) {
            console.error("Lỗi khi lấy danh sách user:", error);
            this.users = [];
        }
    }
    
    
}