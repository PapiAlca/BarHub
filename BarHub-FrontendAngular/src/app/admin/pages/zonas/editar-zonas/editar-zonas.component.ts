import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { ZonaService } from "../services/zonas.service";
import { Zona } from "../interface/zona";

@Component({
  selector: 'app-editar-zona',
  templateUrl: './editar-zona.component.html',
})
export class EditarZonaComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    id: [-1],
    nombre: [],
    descripcion: [],
    ubicacion: [],
    foto: [],
    id_prevision: [],
    id_estacion: [],
  });
  editar: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.cargarZona();
      this.editar = true;
    }
  }

  guardar() {
    if (this.formulario.get('id')?.value > 0) {
      this.editarZona();
    } else {
      this.crearZona();
    }
  }

  cargarZona() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.zonaService.getId(id)),
      )
      .subscribe({
        next: (zona: Zona) => {
          this.formulario.reset(zona);
        },
        error: () => {
          this.router.navigate(['/admin/gestionar-zona']);
        }
      });
  }

  crearZona() {
    console.log(this.formulario.getRawValue); 
    this.zonaService.post(this.formulario.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/gestionar-zonas']);
        }
      });
  }

  editarZona() {
    this.zonaService.put(this.formulario.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/gestionar-zona']);
        }
      });
  }
}