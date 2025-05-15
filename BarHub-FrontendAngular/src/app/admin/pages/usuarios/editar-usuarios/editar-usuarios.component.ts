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

  cargarRoles(): void {
    this.rolService.getRoles().subscribe(roles => {
      this.rolesDisponibles = roles;
    });
  }

  actualizarRolesUsuario(rolesSeleccionados: Rol[]): void {
    const userId = this.formulario.get('id')?.value;
    if (!userId) return;
  
    this.usuarioService.actualizarRoles(userId, rolesSeleccionados)
      .subscribe(rolesActualizados => {
        this.formulario.get('roles')?.setValue(rolesActualizados);
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
            roles: usuario.roles
              ? usuario.roles.map(r => r.name ? r.name : r)
              : [] // Si es undefined, asigna array vacío
          });
        },
        error: () => this.router.navigate(['/admin/gestionar-usuarios'])
      });
  }
  

  crearUsuario() {
    const nuevoUsuario: Usuario = {
      username: this.formulario.value.username,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
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

  toggleRol(rol: Rol): void {
    const roles: Rol[] = this.formulario.value.roles ? [...this.formulario.value.roles] : [];
    
    if (roles.some(r => r.id === rol.id)) {
      // Remover rol si ya existe
      const index = roles.findIndex(r => r.id === rol.id);
      roles.splice(index, 1);
    } else {
      // Agregar rol si no existe
      roles.push(rol);
    }
    
    this.formulario.get('roles')?.setValue(roles);
    this.formulario.get('roles')?.markAsDirty();
  }

  isRoleChecked(rol: Rol): boolean {
    const roles: Rol[] = this.formulario.value.roles || [];
    return roles.some(r => r.id === rol.id);
  }
}