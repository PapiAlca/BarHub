import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../admin/pages/productos/services/producto';
import { Producto } from '../../admin/pages/productos/interface/producto';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  productos: Producto[] = [];
  selectedProducts: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.get().subscribe(data => this.productos = data);
  }

  selectProduct(producto: Producto) {
    this.selectedProducts.push(producto);
  }

  // Lógica botón +
  onAdd(producto: Producto) {

  }
}