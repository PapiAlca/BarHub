import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }
}