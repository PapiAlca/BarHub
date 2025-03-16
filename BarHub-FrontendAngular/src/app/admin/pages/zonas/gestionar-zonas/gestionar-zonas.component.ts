import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../services/zonas.service';
import { Zona } from '../interface/zona';
import { DialogService } from 'src/app/main/services/shared/services/dialog.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-gestionar-zona',
  templateUrl: './gestionar-zona.component.html'
})
export class GestionarZonaComponent implements OnInit {

  zonas: Zona[] = [];

  constructor(
    private zonaService: ZonaService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.cargarZonas();
  }

  cargarZonas() {
    this.zonaService.get()
      .pipe(
      
    )
      .subscribe(zonas => {
        this.zonas = zonas;
      });
  }

  borrarZona(zona: Zona) {
    this.dialogService.solicitarConfirmacion('¿Está seguro de que desea eliminar la zona?',
       'Eliminar zona', 
      () => {
      this.zonaService.del(zona)
        .subscribe(() => {
          this.dialogService.mostrarToast('Zona eliminada correctamente');
        });
    });
  }
}