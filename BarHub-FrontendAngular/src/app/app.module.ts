import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UicomponentsModule } from './uicomponents/uicomponents.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CartaComponent } from './public/carta/carta.component';
import { ConfirmarPedidoComponent } from './public/confirmar-pedido/confirmar-pedido.component';
import { GestionarComandasComponent } from './public/gestionar-comandas/gestionar-comandas.component';
import { GestionarMesasEmpleadoComponent } from './public/gestionar-mesas-empleado/gestionar-mesas-empleado.component';
import { GestionarPagosEfectivoComponent } from './public/gestionar-pagos-efectivo/gestionar-pagos-efectivo.component';
import { SeguimientoPedidosComponent } from './public/seguimiento-pedidos/seguimiento-pedidos.component';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    ConfirmarPedidoComponent,
    GestionarComandasComponent,
    GestionarMesasEmpleadoComponent,
    GestionarPagosEfectivoComponent,
    SeguimientoPedidosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UicomponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],  
  exports: [
    CartaComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
