// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/pages/dashboard-view/dashboard-view.component';
import { LoginComponent } from './component/pages/login-view/login-view.component';
import { CategoryViewComponent } from './component/pages/category-view/category-view.component';
import { BrandViewComponent } from './component/pages/brand-view/brand-view.component';
import { BannerViewComponent } from './component/pages/banner-view/banner-view.component';
import { ProductViewComponent } from './component/pages/product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CategoryViewComponent,
    BrandViewComponent,
    BannerViewComponent,
    ProductViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [], // AuthService không cần phải khai báo ở đây nếu đã dùng 'providedIn: root'
  bootstrap: [AppComponent]
})
export class AppModule { }
