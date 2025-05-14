import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../interface/pedido';
import { PedidoService } from '../services/pedido';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html'
})
export class VerPedidoComponent implements OnInit {

  pedido!: Pedido;

  constructor(
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarPedido();
  }
  
  cargarPedido() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.pedidoService.getId(id);
        }),
      )
      .subscribe(
        pedido => {
          this.pedido = pedido;
          console.log('Pedido cargado:', this.pedido);
        },
        error => {
          console.error('Error al cargar la pedido:', error);
        }
      );
  }   
}