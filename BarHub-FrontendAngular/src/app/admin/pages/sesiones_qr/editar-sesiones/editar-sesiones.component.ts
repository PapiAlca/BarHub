import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { SesionService } from "../services/sesion";
import { Sesion } from "../interface/sesion";
import { UsuarioService } from "../../usuarios/services/usuario";
import { MesaService } from "../../mesas/services/mesa";


@Component({
  selector: 'app-editar-sesion',
  templateUrl: './editar-sesion.component.html',
})
export class EditarSesionComponent implements OnInit {

  users: any[] = [];
  mesas: any[] = [];
  formulario: FormGroup;
  editar: boolean = false;

  ngOnInit(): void {
    this.usuarioService.get().subscribe(data => this.users = data);
    this.mesaService.get().subscribe(data => this.mesas = data);

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editar = true;
        this.cargarSesion(params['id']);
      }
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private mesaService: MesaService,
    private sesionService: SesionService,
  ) {
    // Inicializa el formulario en el constructor
    this.formulario = this.fb.group({
      id_user: [null],
      id_mesa: [null],
      token: [null],
      fecha: [new Date().toISOString().split('T')[0]]
    });
  }

  guardar() {
    if (this.editar && this.formulario.get('id')?.value > 0) {
      this.editarSesion();
    } else {
      this.crearSesion();
    }
  }

  cargarSesion(id: string) {
    this.sesionService.getId(id).subscribe({
      next: (sesion: Sesion) => {
        this.formulario.patchValue(sesion);
      },
      error: () => {
        this.router.navigate(['/admin/gestionar-sesiones']);
      }
    });
  }

  crearSesion() {
    const nuevaSesion: Sesion = this.formulario.value;
    console.log("Sesion a enviar:", nuevaSesion);
    this.sesionService.post(nuevaSesion).subscribe(
      response => {
        this.router.navigate(['/admin/gestionar-sesiones']);
      },
      error => {
        console.error('Error al crear el pedido:', error);
      });
  }

  editarSesion() {
    const datosSesion = this.formulario.value;
    this.sesionService.put(datosSesion).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/gestionar-sesiones']);
      },
      error: (err) => {
        console.error('Error en la petición PUT:', err);
      }
    });
  }  
}