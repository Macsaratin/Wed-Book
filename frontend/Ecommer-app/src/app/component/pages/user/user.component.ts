import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {}; // Lưu thông tin user

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  async ngOnInit() {
    const email = localStorage.getItem("username");
    if (email) {
      try {
        this.user = await this.userService.getUserInfo(email);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    } else {
      this.router.navigate(['/login']); // Chuyển hướng nếu chưa đăng nhập
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Chuyển về trang đăng nhập
    }).catch(error => console.error("Lỗi khi đăng xuất:", error));
  }
}
