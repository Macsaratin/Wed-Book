import { Injectable } from '@angular/core';
import axios from 'axios';

interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor() {}

  async register(user: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, user, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
      throw error;
    }
  }

  async login({ username, password }: LoginParams): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        email: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const token = response.data['jwt-token'];
      localStorage.setItem('jwt-token', token);
      localStorage.setItem('username', username);

      const userResponse = await axios.get(`${this.apiUrl}/public/users/email/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const cartID = userResponse.data.cart.cartID;
      localStorage.setItem('cartID', cartID);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(new Error('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.'));
    }
  }

  logout(): Promise<void> {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('username');
    localStorage.removeItem('cartID');
    return Promise.resolve();
  }

  checkAuth(): Promise<void> {
    return localStorage.getItem('jwt-token') ? Promise.resolve() : Promise.reject();
  }

  getPermissions(): Promise<void> {
    return Promise.resolve();
  }

  getUserInfo(): Promise<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('jwt-token');
    if (!username || !token) {
      return Promise.reject(new Error('Không có thông tin người dùng.'));
    }
    return axios.get(`${this.apiUrl}/public/users/email/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.data);
  }
}