// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/pages/dashboard-view/dashboard-view.component';
import { CategoryViewComponent } from './component/pages/category-view/category-view.component';
import { BannerViewComponent } from './component/pages/banner-view/banner-view.component';
import { ProductViewComponent } from './component/pages/product-view/product-view.component';
import { LoginComponent } from './component/pages/login/login.component';
import { UserComponent } from './component/pages/user/user.component';
import { UserListComponent } from './component/pages/user/user-list/user-list.component';

import { LayoutComponent } from './component/pages/layout/layout.component';
import { UserEditComponent } from './component/pages/user/user-edit/user-edit.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryViewComponent,
    BannerViewComponent,
    ProductViewComponent,
    LoginComponent,
    UserComponent,
    UserListComponent,

    LayoutComponent,
     UserEditComponent,
     RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [], // AuthService không cần phải khai báo ở đây nếu đã dùng 'providedIn: root'
  bootstrap: [AppComponent]
  
})
export class AppModule { }
