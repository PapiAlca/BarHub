import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { RolService } from "../services/rol";
import { UsuarioService } from "../services/usuario";
import { Usuario, Rol } from "../interface/usuario";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
})
export class EditarUsuarioComponent implements OnInit {
  
  formulario: FormGroup = this.fb.group({
    id: [-1],
    nombre: [''],
    email: [''],
    habilitado: [true],
    roles: [[]]
  });
  editar: boolean = false;
  rolesDisponibles: Rol[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
    if (this.router.url.includes('editar')) {
      this.cargarUsuario();
      this.editar = true;
    }
  }

  cargarRoles() {
    this.rolService.getRoles().subscribe({
      next: (roles) => this.rolesDisponibles = roles,
      error: (err) => console.error('Error cargando roles:', err)
    });
  }  

  guardar() {
    if (this.formulario.get('id')?.value > 0) {
      this.editarUsuario();
    } else {
      this.crearUsuario();
    }
  }

  cargarUsuario() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getId(id)),
      )
      .subscribe({
        next: (usuario: Usuario) => {
          this.formulario.reset({
            ...usuario,
            roles: usuario.roles.map(r => r.rol || r)
          });
        },
        error: () => {
          this.router.navigate(['/admin/gestionar-usuarios']);
        }
      });
  }

  crearUsuario() {
    const nuevoUsuario: Usuario = {
      nombre: this.formulario.value.nombre,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
      habilitado: this.formulario.value.habilitado,
      roles: this.formulario.value.roles,
    };

    this.usuarioService.post(nuevoUsuario).subscribe(
      response => {
        this.router.navigate(['/admin/gestionar-usuarios']);
      },
      error => {
        console.error('Error al crear el usuario:', error);
      });
  }

  editarUsuario() {
    const datosUsuario = this.formulario.getRawValue();

    this.usuarioService.put(datosUsuario).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/gestionar-usuarios']);
      },
      error: (err) => {
        console.error('Error en la petición PUT:', err);
      }
    });
  }

  onRoleChange(event: any, rol: Rol) {
    const roles: Rol[] = this.formulario.value.roles ? [...this.formulario.value.roles] : [];
    if (event.target.checked) {
      // Añadir rol si está seleccionado y no existe ya
      if (!roles.some(r => r.id === rol.id)) {
        roles.push(rol);
      }
    } else {
      // Eliminar rol si está desmarcado
      const idx = roles.findIndex(r => r.id === rol.id);
      if (idx !== -1) {
        roles.splice(idx, 1);
      }
    }
    this.formulario.get('roles')?.setValue(roles);
    this.formulario.get('roles')?.markAsDirty();
  }

  isRoleChecked(rol: Rol): boolean {
    const roles: Rol[] = this.formulario.value.roles || [];
    return roles.some(r => r.id === rol.id);
  }
}