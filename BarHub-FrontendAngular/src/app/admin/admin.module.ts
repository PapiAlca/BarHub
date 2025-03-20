import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { GestionarMesaComponent } from './pages/mesas/gestionar-mesas/gestionar-mesa.component';
import { VerMesaComponent } from './pages/mesas/ver-mesa/ver-mesa.component';
import { EditarMesaComponent } from './pages/mesas/editar-mesas/editar-mesas.component'

@NgModule({
  declarations: [
    BienvenidaComponent,
    GestionarMesaComponent,
    VerMesaComponent,
    EditarMesaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule,
    UicomponentsModule,
    FormsModule
  ]
})
export class AdminModule { }
