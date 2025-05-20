import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from "../../usuarios/services/usuario";
import { MesaService } from "../../mesas/services/mesa";
import { Sesion } from '../interface/sesion';
import { SesionService } from '../services/sesion';

@Component({
  selector: 'app-ver-sesion',
  templateUrl: './ver-sesion.component.html'
})
export class VerSesionComponent implements OnInit {
  users: any[] = [];
  mesas: any[] = [];
  sesion!: Sesion;

  constructor(
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarPedido();
  }
  
  cargarPedido() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.sesionService.getId(id);
        }),
      )
      .subscribe(
        sesion => {
          this.sesion = sesion;
          console.log('Sesion cargado:', this.sesion);
        },
        error => {
          console.error('Error al cargar la sesion:', error);
        }
      );
  }   

  getUserName(id_user: number | null | undefined): string {
    if (id_user === null || id_user === undefined) return 'Usuario no encontrado';
    const user = this.users.find(u => u.id === id_user);
    console.log(id_user);
    return user ? user.nombre : id_user.toString();
  }
  
  getMesaCodigo(id_mesa: number | null | undefined): string {
    if (id_mesa === null || id_mesa === undefined) return 'Mesa no encontrada';
    const mesa = this.mesas.find(m => m.id === id_mesa);
    console.log(id_mesa);
    return mesa ? mesa.codigoqr : id_mesa.toString();
  }
}