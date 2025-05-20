import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// src/app/public/services/mesa.service.ts
@Injectable({ providedIn: 'root' })
export class MesaService {
  private mesaActual = new BehaviorSubject<number | null>(null);
  
  setMesa(id: number) {
    localStorage.setItem('mesa_actual', id.toString());
    this.mesaActual.next(id);
  }

  getMesaActual(): number | null {
    return this.mesaActual.value;
  }
}