import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/pages/layout/layout.component';
import { DashboardComponent } from './component/pages/dashboard-view/dashboard-view.component';
import { LoginComponent } from './component/pages/login/login.component';
import { UserComponent } from './component/pages/user/user.component';
import { BannerViewComponent } from './component/pages/banner-view/banner-view.component';

// Guard để kiểm tra đăng nhập
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Kiểm tra đăng nhập trước khi vào layout
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'banner', component: BannerViewComponent },
      { path: 'user', component: UserComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Điều hướng nếu route không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
