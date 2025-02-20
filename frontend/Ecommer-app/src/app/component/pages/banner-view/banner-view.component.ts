import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../service/banner.service';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.css']
})
export class BannerViewComponent implements OnInit {

  banner: any[] = [];

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  async loadBanners() {
    try {
      const response = await this.bannerService.getList();
      this.banner = response.banner;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
    }
  }

  async deleteBanner(id: number) {
    try {
      await this.bannerService.deleteBanner(id);
      this.banner = this.banner.filter(b => b.id !== id);
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
    }
  }

}
