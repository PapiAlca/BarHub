import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartaComponent } from './public/carta/carta.component';
import { ConfirmarPedidoComponent } from './public/confirmar-pedido/confirmar-pedido.component';
import { SeguimientoPedidosComponent } from './public/seguimiento-pedidos/seguimiento-pedidos.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), },
  { path: 'carta', component: CartaComponent },
  { path: 'confirmar-pedido', component: ConfirmarPedidoComponent },
  { path: 'seguimiento-pedidos', component: SeguimientoPedidosComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
