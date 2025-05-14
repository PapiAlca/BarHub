import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido';
import { Pedido } from '../interface/pedido';
import { DialogService } from 'src/app/main/services/shared/services/dialog.service';
import { UsuarioService } from "../../usuarios/services/usuario";
import { MesaService } from "../../mesas/services/mesa";
import { tap } from 'rxjs';

@Component({
  selector: 'app-gestionar-pedido',
  templateUrl: './gestionar-pedido.component.html'
})
export class GestionarPedidoComponent implements OnInit {
  users: any[] = [];
  mesas: any[] = [];
  pedidos: Pedido[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe(data => this.users = data);
    this.mesaService.get().subscribe(data => this.mesas = data);
    
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.get().subscribe(pedidos => {
      console.log('Pedidos cargadas:', pedidos);
      this.pedidos = pedidos;
    });
  }

  borrarPedido(pedido: Pedido) {
    this.dialogService.solicitarConfirmacion('¿Está seguro de que desea eliminar el pedido?',
       'Eliminar pedido', 
      () => {
      this.pedidoService.del(pedido)
        .subscribe(() => {
          this.dialogService.mostrarToast('Pedido eliminado correctamente');
          this.cargarPedidos();
        });
    });
  }

  getUserName(userId: number | null | undefined): string {
    if (userId === null || userId === undefined) return 'Usuario no encontrado';
    const user = this.users.find(u => u.id === userId);
    return user ? user.nombre : userId.toString();
  }
  
  getMesaCodigo(mesaId: number | null | undefined): string {
    if (mesaId === null || mesaId === undefined) return 'Mesa no encontrada';
    const mesa = this.mesas.find(m => m.id === mesaId);
    return mesa ? mesa.codigoqr : mesaId.toString();
  }
}