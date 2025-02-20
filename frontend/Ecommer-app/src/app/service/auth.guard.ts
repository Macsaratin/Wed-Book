import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      this.router.navigate(['/login']); // Nếu chưa đăng nhập, chuyển về trang login
      return false;
    }
    return true;
  }
}
