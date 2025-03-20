import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
})
export class RegistroComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrar() {
    if (this.formulario.valid) {
      const user = this.formulario.value;
      this.authService.registrar(user).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
        },
      });
    }
  }
}
