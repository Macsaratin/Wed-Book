import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: any=[];
    currentPage: number = 1; 
    itemsPerPage: number = 8; 

  constructor(private readonly userService: UserService) {}

    ngOnInit() {
        this.getAllUser();
    }
    setPage(event: number) {
        this.currentPage = event;
      }
      
    async getAllUser() {
        try {
            const response = await this.userService.getList();
            console.log("Dữ liệu nhận được từ API:", response); 
    
            if (!Array.isArray(response)) {
                throw new Error("Dữ liệu API không phải là mảng!");
            }
            this.users = response.map(user => ({
                ...user,
                address: user.address || { city: 'Chưa có địa chỉ' } // Mặc định nếu không có địa chỉ
            }))
            this.users = response; 
        } catch (error) {
            console.error("Lỗi khi lấy danh sách user:", error);
        }
    }    
    
    
}