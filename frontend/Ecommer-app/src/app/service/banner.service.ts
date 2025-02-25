import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'http://localhost:8080/api';

  
  async getBannerByid(id: number) {
    const token = localStorage.getItem('jwt-token'); 
    try {
      const response = await axios.get(`${this.apiUrl}/banner/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
      }
  }); 
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
      throw error;
    }
  }
  async getAllBanner() {
    try {
        const token = localStorage.getItem('jwt-token'); 
        if (!token) throw new Error("Không tìm thấy token!");
        const response = await axios.get(`${this.apiUrl}/admin/banner`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        // console.log("Dữ liệu nhận được từ API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
        return [];
    }
}


  async deleteBanner(id: number) {
    try {
      await axios.get(`${this.apiUrl}/delete/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
      throw error;
    }
  }

}
