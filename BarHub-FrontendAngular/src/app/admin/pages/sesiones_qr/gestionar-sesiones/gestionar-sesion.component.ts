import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion';
import { Sesion } from '../interface/sesion';
import { DialogService } from 'src/app/main/services/shared/services/dialog.service';
import { UsuarioService } from "../../usuarios/services/usuario";
import { MesaService } from "../../mesas/services/mesa";
import { tap } from 'rxjs';

@Component({
  selector: 'app-gestionar-sesiones',
  templateUrl: './gestionar-sesion.component.html'
})
export class GestionarSesionComponent implements OnInit {
  users: any[] = [];
  mesas: any[] = [];
  sesiones: Sesion[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private mesaService: MesaService,
    private sesionService: SesionService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe(data => this.users = data);
    this.mesaService.get().subscribe(data => this.mesas = data);
    
    this.cargarSesiones();
  }

  cargarSesiones() {
    this.sesionService.get().subscribe(data => {
      this.sesiones = data.map(sesiones => ({
        ...sesiones,
        usuario: this.users.find(u => u.id === sesiones.id_user),
        mesa: this.mesas.find(m => m.id === sesiones.id_mesa)
      }));
      console.log("Sesiones cargadas:", this.sesiones);
    });
  }  

  borrarSesion(sesion: Sesion) {
    this.dialogService.solicitarConfirmacion('¿Está seguro de que desea eliminar la sesion?',
       'Eliminar sesion', 
      () => {
      this.sesionService.del(sesion)
        .subscribe(() => {
          this.dialogService.mostrarToast('Sesion eliminada correctamente');
          this.cargarSesiones();
        });
    });
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