import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Pago } from '../../admin/pages/pagos/interface/pago';
import { Producto } from '../../admin/pages/productos/interface/producto';
import { Pedido } from '../../admin/pages/pedidos/interface/pedido';
import { DetallesService } from '../../admin/pages/detalles_pedidos/services/detalle';
import { PagoService } from '../../admin/pages/pagos/services/pago';
import { PedidoService } from '../../admin/pages/pedidos/services/pedido';

(pdfMake as any).addVirtualFileSystem(pdfFonts);

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
}

interface PedidoTemporal {
  idMesa: number;
  productos: ProductoSeleccionado[];
}

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {
  pedidoTemporal: PedidoTemporal | null = null;
  metodoPago: string = 'efectivo';
  datosTarjeta = {
    numero: '',
    titular: '',
    caducidad: '',
    cvv: ''
  };

  constructor(
    private detalleService: DetallesService,
    private pagoService: PagoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit() {
    const pedidoData = localStorage.getItem('pedidoTemporal');
    if (pedidoData) {
      this.pedidoTemporal = JSON.parse(pedidoData);
    } else {
      // Si no hay datos, redirigir a la carta
      this.router.navigate(['/carta']);
    }
  }

  // Calcular el total del pedido
  calcularTotal(): number {
    if (!this.pedidoTemporal) return 0;
    
    return this.pedidoTemporal.productos.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad), 
      0
    );
  }

  // Genera y descarga un pdf con la cuenta de lo que ha pedido el usuario:
  generarTicketPDF(pedidoId: number) {
    if (!this.pedidoTemporal) return;
  
    const productos = this.pedidoTemporal.productos.map(item => [
      item.producto.nombre,
      item.producto.precio.toFixed(2) + ' €',
      item.cantidad,
      (item.producto.precio * item.cantidad).toFixed(2) + ' €'
    ]);
  
    const docDefinition = {
      content: [
        { text: 'BARHUB - Ticket de Compra', style: 'header' },
        { text: `Pedido Num: ${pedidoId}`, style: 'pedidoId' },
        { text: `Fecha: ${new Date().toLocaleDateString()}` },
        { text: `Mesa: ${this.pedidoTemporal.idMesa}` },
        { text: `Método de pago: ${this.metodoPago}` },
        { text: ' ' },
        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio Unit.', 'Cantidad', 'Subtotal'],
              ...productos
            ]
          }
        },
        { text: ' ' },
        {
          text: 'Total: ' + this.calcularTotal().toFixed(2) + ' €',
          style: 'total'
        }
      ],
      styles: {
        header: { fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        pedidoId: { fontSize: 12, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        total: { fontSize: 16, bold: true, alignment: 'right' }
      }
    };
    (pdfMake as any).createPdf(docDefinition).download('ticket_barhub.pdf');
  }
  
  

  // Enviar pedido al servidor  
  finalizarPedido() {
    if (!this.pedidoTemporal) return;
  
    const usuario = JSON.parse(localStorage.getItem('user') || 'null');
  
    const pedido: Pedido = {
      id_mesa: this.pedidoTemporal.idMesa,
      total: this.calcularTotal(),
      estado: 'pendiente',
      fecha: new Date().toISOString().split('T')[0],
      id_user: usuario?.id
    };
  
    // 1. Crear el pedido
    this.pedidoService.post(pedido).subscribe({
      next: (pedidoCreado) => {
        // 2. Crear los detalles
        const detalles = this.pedidoTemporal!.productos.map(item => ({
          id_pedido: pedidoCreado.id!,
          id_producto: item.producto.id!,
          cantidad: item.cantidad,
          precio_unitario: item.producto.precio
        }));
  
        detalles.forEach(detalle => {
          this.detalleService.post(detalle).subscribe({
            error: (err) => {
              console.error('Error creando detalle:', err);
            }
          });
        });
  
        // 3. Crear el pago
        const pago: Pago = {
          id_pedido: pedidoCreado.id,
          metodo_pago: this.metodoPago,
          estado_pago: this.metodoPago === 'tarjeta' ? 'completado' : 'pendiente',
          total: pedidoCreado.total,
          fecha_pago: new Date().toISOString().split('T')[0]
        };
  
        this.pagoService.post(pago).subscribe({
          next: () => {
            if (pedidoCreado.id !== undefined) {
              this.generarTicketPDF(pedidoCreado.id);
            }
            localStorage.removeItem('pedidoTemporal');
            alert('Pedido realizado con éxito');
            this.router.navigate(['/carta']);
          },
          error: (err) => {
            console.error('Error creando pago:', err);
            alert('Error al guardar el pago');
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err.error?.message || 'Error al guardar el pedido');
      }
    });
  }  

  cancelarPedido() {
    if (confirm('¿Está seguro que desea cancelar el pedido?')) {
      localStorage.removeItem('pedidoTemporal');
      this.router.navigate(['/carta']);
    }
  }
}