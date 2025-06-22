import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  roles: string[] = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
  
    const formValue = this.registerForm.value;
  
    const requestPayload = {
      username: formValue.username,
      password: formValue.password,
      roles: [formValue.role]  
    };
  
    this.authService.register(requestPayload).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
        if (this.successMessage) {
          setTimeout(() => this.successMessage = '', 3000); // hide after 3 sec
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Registration failed. Try again.';
        this.successMessage = '';
        if (this.errorMessage) {
          setTimeout(() => this.errorMessage = '', 4000); // hide after 4 sec
        }
      }
    });
  }
  
  togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
 }

}
