import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  
  constructor(public authService: AuthService) {}

  get sesionIniciada(): boolean {
    return this.authService.isAuthenticated();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  get isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }
}