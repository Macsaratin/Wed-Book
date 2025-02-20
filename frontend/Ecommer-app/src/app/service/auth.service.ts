import { Injectable } from '@angular/core';
import axios from 'axios';

interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserInfo() {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  async login({ username, password }: LoginParams): Promise<void> {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Lưu token vào localStorage
      const token = response.data["jwt-token"];
      localStorage.setItem("jwt-token", token);
      localStorage.setItem("username", username);

      // Gọi API lấy cartID
      const userResponse = await axios.get(`http://localhost:8080/api/public/users/email/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const cartID = userResponse.data.cart.cartID;
      localStorage.setItem("cartID", cartID);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."));
    }
  }
  logout(): Promise<void> {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("username");
    return Promise.resolve();
  }
  

  checkAuth(): Promise<void> {
    return localStorage.getItem("jwt-token") ? Promise.resolve() : Promise.reject();
  }

  getPermissions(): Promise<void> {
    return Promise.resolve();
  }
}
