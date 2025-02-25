import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    userId: 0,
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    roles: [{ roleId: 101, roleName: 'ADMIN' }],
    address: {
      addressId: 0,
      street: '',
      city: '',
      country: '',
    },
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onRegister() {
    console.log('Dữ liệu gửi đi:', this.user); // Log kiểm tra dữ liệu gửi lên API
    try {
      const response = await this.authService.register(this.user);
      console.log('Phản hồi từ API:', response);
      
      this.successMessage = 'Đăng ký thành công! Đang chuyển hướng...';
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error: any) {
      console.error('Lỗi đăng ký:', error.response?.data || error.message);
      this.errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
    }
  }
}
