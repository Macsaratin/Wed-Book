// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Đăng nhập
  async login(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login', 
        { email: username, password: password },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      
      const token = response.data['jwt-token'];
      console.log(token);

      localStorage.setItem('jwt-token', token);
      localStorage.setItem('username', username);
      return Promise.resolve();
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(new Error('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.'));
    }
  }

  // Đăng xuất
  logout(): Promise<void> {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('username');
    return Promise.resolve();
  }

  // Kiểm tra lỗi (401, 403)
  checkError(status: number): Promise<void> {
    if (status === 401 || status === 403) {
      localStorage.removeItem('jwt-token');
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // Kiểm tra xác thực
  checkAuth(): Promise<void> {
    return localStorage.getItem('jwt-token') ? Promise.resolve() : Promise.reject();
  }

  // Lấy quyền (Có thể mở rộng sau này nếu cần)
  getPermissions(): Promise<void> {
    return Promise.resolve();
  }
}
