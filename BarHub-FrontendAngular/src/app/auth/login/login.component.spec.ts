import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  iniciarSesion() {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value;
      this.authService.iniciarSesion({ email, password }).subscribe({
        next: (response) => {
          console.log('Usuario logueado:', response);
          // Guardar el token en el localStorage o en el servicio de sesión
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin/gestionar-mesas']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
        },
      });
    }
  }
}
