import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor() { }

  async getAllCategory() {
    try {
        const token = localStorage.getItem('jwt-token'); 
        if (!token) throw new Error("Không tìm thấy token!");
        const response = await axios.get(`${this.apiUrl}/admin/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log("Dữ liệu nhận được từ API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
        return [];
    }
}
}
