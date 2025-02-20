import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';
  async getUserInfo(email: string) {
    try {
      const token = localStorage.getItem("jwt-token");
      const response = await axios.get(`${this.apiUrl}/public/users/email/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      return null;
    }
  }
}
