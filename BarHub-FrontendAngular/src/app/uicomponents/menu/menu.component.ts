import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  get sesionIniciada(): boolean {
    return this.authService.isAuthenticated();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}