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
  async getList() {
    try {
        const token = localStorage.getItem('jwt-token'); 
        if (!token) throw new Error("Không tìm thấy token!");

        const response = await axios.get(`${this.apiUrl}/admin/users/all`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("Dữ liệu API trả về:", response.data); 
        return Array.isArray(response.data.users) ? response.data.users || response.data.addressed || [] : response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        return [];
    }
}

logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Xóa dữ liệu user và token
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    resolve();
  });
}
}