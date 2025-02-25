import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/category.service';


@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  
})
export class CategoryViewComponent implements OnInit {
  category: any[] = [];

  constructor(private categoryService: CategoryService) { 
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  async getAllCategory(){
    try {
      const response = await this.categoryService.getAllCategory();
      console.log("Dữ liệu nhận được từ API:", response); 
      if (!Array.isArray(response)) {
          throw new Error("Dữ liệu API không phải là mảng!");
      }

      this.category = response ; 
  } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      this.category = [];
  }

  }

}
