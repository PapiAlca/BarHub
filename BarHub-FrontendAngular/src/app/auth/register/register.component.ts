import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    password: '',
    role: ['ROLE_CLIENTE']
  };

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/auth/signup', this.form)
      .subscribe({
        next: (res) => {
          console.log('✅ Registro exitoso', res);
          alert('Usuario registrado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al registrarse', err);
          alert('Error al registrarse');
        }
      });
  }
}
