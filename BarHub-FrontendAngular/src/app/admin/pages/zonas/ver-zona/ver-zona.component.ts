import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Zona } from '../interface/zona';
import { ZonaService } from '../services/zonas.service';

@Component({
  selector: 'app-ver-zona',
  templateUrl: './ver-zona.component.html'
})
export class VerZonaComponent implements OnInit {

  zona!: Zona;

  constructor(
    private zonaService: ZonaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarZona();
  }

  cargarZona() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.zonaService.getId(id)),
      )
      .subscribe(zona => {
        this.zona = zona;
      })
  }
}