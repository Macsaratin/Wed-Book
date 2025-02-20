// import axios, { AxiosInstance } from 'axios';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

// private axiosInstance: AxiosInstance;

//   constructor() { 
//     this.axiosInstance = axios.create({
//       baseURL: 'http://localhost:8080/api', // Thay đổi URL API của bạn
//       timeout: 3000, // Timeout sau 5s
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//   }

//   async getData(endpoint: string) {
//     try {
//       const response = await this.axiosInstance.get(endpoint);
//       return response.data;
//     } catch (error) {
//       console.error('GET Error:', error);
//       throw error;
//     }
//   }

//   async postData(endpoint: string, data: any) {
//     try {
//       const response = await this.axiosInstance.post(endpoint, data);
//       return response.data;
//     } catch (error) {
//       console.error('POST Error:', error);
//       throw error;
//     }
//   }
// }
