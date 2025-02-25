import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild('signIn') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.signInButton && this.container) {
        this.signInButton.nativeElement.addEventListener('click', () => {
          this.container.nativeElement.classList.remove('right-panel-active');
        });
      }
    }, 0);
  }

  async onLogin() {
    try {
      await this.authService.login({ username: this.username, password: this.password });
      this.errorMessage = '';
      this.successMessage = 'Đăng nhập thành công! Đang chuyển hướng...';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        this.successMessage = '';
      }, 2000);
    } catch (error: any) {
      this.errorMessage = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
      this.successMessage = '';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Điều hướng sang trang đăng ký
  }
}