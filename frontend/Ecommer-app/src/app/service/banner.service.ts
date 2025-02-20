import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'http://localhost:8080/api/admin';

  
  async getBannerByid(id: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/banner/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
      throw error;
    }
  }
  async getList() {
    try {
      const response = await axios.get(`${this.apiUrl}/banner`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
      throw error;
    }
  }
  // async postbanner(){

  // }
  async deleteBanner(id: number) {
    try {
      await axios.get(`${this.apiUrl}/delete/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
      throw error;
    }
  }

}
