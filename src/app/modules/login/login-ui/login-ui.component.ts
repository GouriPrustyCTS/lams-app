import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true, // Mark as standalone
  selector: 'app-login-ui', 
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // <--- THIS IS CRUCIAL FOR FORMS
})
export class LoginUiComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null; // Clear previous errors
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']); // Redirect to dashboard on success
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password.';
          } else {
            this.errorMessage = 'An error occurred during login. Please try again.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please enter valid credentials.';
      this.loginForm.markAllAsTouched(); // Show validation errors
    }
  }
}