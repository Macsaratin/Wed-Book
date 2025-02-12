// src/app/component/pages/login-view/login-view.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.component'; // Import đúng đường dẫn

@Component({
  selector: 'app-login',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService vào constructor
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Kiểm tra email có hợp lệ hay không trước khi gọi authService.login
      if (email === 'string' && email.trim() !== '' && password ==='string' && password.trim() != '') {
        this.authService.login(email, password).then(() => {
          this.router.navigate(['/dashboard']); // Điều hướng đến trang Dashboard sau khi đăng nhập thành công
        }).catch((error: any) => {
          alert(error.message || 'Đăng nhập thất bại');
        });
      } else {
        alert('Vui lòng nhập email hợp lệ');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }
}
