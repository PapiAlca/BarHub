import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido';
import { Pedido } from '../interface/pedido';

@Component({
  selector: 'app-seguimiento-pedidos',
  templateUrl: './seguimiento-pedidos.component.html',
  styleUrls: ['./seguimiento-pedidos.component.css']
})
export class SeguimientoPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  usuario: any;
  pedidosOcultos: number[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user') || 'null');
    if (this.usuario?.id) {
      this.pedidoService.getPedidosByUsuario(this.usuario.id).subscribe(data => {
        this.pedidos = data;
      });
    }
  }

  eliminarPedido(pedido: Pedido) {
    if (confirm('¿Seguro que quieres eliminar este seguimiento?')) {
      this.pedidoService.del(pedido).subscribe({
        next: () => {
          this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
        },
        error: () => {
          alert('Error eliminando el pedido');
        }
      });
    }
  }
}