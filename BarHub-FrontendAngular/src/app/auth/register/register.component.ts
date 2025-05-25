import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    password: '',
    role: ['ROLE_CLIENTE']
  };
  confirmPassword = '';
  usernameTaken = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
    ) {}

  onSubmit(): void {
    this.usernameTaken = false;

    if (this.form.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.http.post('http://localhost:8080/api/auth/signup', this.form)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && error.error.message === 'Username is already taken!') {
            this.usernameTaken = true;
          }
          return of(null);
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('✅ Registro exitoso', res);
            this.authService.login({
              username: this.form.username,
              password: this.form.password
            }).subscribe({
              next: () => {
                this.router.navigate(['/carta']);
              },
              error: err => {
                alert('Error al iniciar sesión automáticamente');
              }
            });
          }
        },
        error: (err) => {
          console.error('❌ Error al registrarse', err);
          if (!this.usernameTaken) {
            alert('Error al registrarse');
          }
        }
      });
  }
}
