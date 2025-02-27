import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../service/banner.service';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.css']
})
export class BannerViewComponent implements OnInit {

  banner: any[]=[];

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.getAllBanner();
  }

  async getAllBanner() {
    try {
        const response = await this.bannerService.getAllBanner();
        // console.log("Dữ liệu nhận được từ API:", response); 

        if (!Array.isArray(response)) {
            throw new Error("Dữ liệu API không phải là mảng!");
        }

        this.banner = response ; 
    } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
        this.banner = [];
    }
}    

  

}