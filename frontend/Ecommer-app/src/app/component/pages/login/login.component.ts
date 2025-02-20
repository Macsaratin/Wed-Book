import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  @ViewChild('signUp') signUpButton!: ElementRef;
  @ViewChild('signIn') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.signUpButton && this.signInButton && this.container) {
        this.signUpButton.nativeElement.addEventListener('click', () => {
          this.container.nativeElement.classList.add("right-panel-active");
        });

        this.signInButton.nativeElement.addEventListener('click', () => {
          this.container.nativeElement.classList.remove("right-panel-active");
        });
      }
    });
  }

  async onLogin() {
    try {
      await this.authService.login({ username: this.username, password: this.password });
      this.router.navigate(['/dashboard']); // Điều hướng sau khi đăng nhập thành công
    } catch (error) {
      this.errorMessage = "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.";
    }
  }
}
