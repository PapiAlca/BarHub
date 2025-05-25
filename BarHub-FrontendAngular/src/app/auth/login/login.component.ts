import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
  
    const credentials = {
      username: this.form.value.username,
      password: this.form.value.password
    };
  
    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
      
        const payload = JSON.parse(atob(res.token.split('.')[1]));

        localStorage.setItem('roles', JSON.stringify(payload.roles));
        localStorage.setItem('username', payload.username);
      
        console.log('roles:', JSON.stringify(payload.roles))
        this.router.navigate(['/carta']);
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.errorMessage = 'Credenciales inválidas o error del servidor';
      }
    });
  }
  
}