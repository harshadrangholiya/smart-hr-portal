import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        const role = this.authService.getRole();
        const username = this.authService.getUserName();
        localStorage.setItem("role", role ?? "");
        localStorage.setItem("username", username ?? "");

        if (role === 'ADMIN') this.router.navigate(['/admin']);
        else if (role === 'MANAGER') this.router.navigate(['/manager']);
        else this.router.navigate(['/employee']);
      },
      error: () => {
        this.errorMessage = 'Invalid Username or password';

      }
    });
  }
}
