import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Ruta Bienvenida Admin
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';

// Rutas Mesas
import { EditarMesaComponent } from './pages/mesas/editar-mesas/editar-mesas.component';
import { GestionarMesaComponent } from './pages/mesas/gestionar-mesas/gestionar-mesa.component';
import { VerMesaComponent } from './pages/mesas/ver-mesa/ver-mesa.component';

// Rutas Productos
import { EditarProductoComponent } from './pages/productos/editar-productos/editar-productos.component';
import { GestionarProductoComponent } from './pages/productos/gestionar-productos/gestionar-producto.component';
import { VerProductoComponent } from './pages/productos/ver-producto/ver-producto.component';

// Rutas Usuarios
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuarios/editar-usuarios.component';
import { GestionarUsuarioComponent } from './pages/usuarios/gestionar-usuarios/gestionar-usuario.component';
import { VerUsuarioComponent } from './pages/usuarios/ver-usuario/ver-usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BienvenidaComponent
      },

      // Mesas
      {
        path: 'crear-mesa',
        component: EditarMesaComponent,
      },
      {
        path: 'editar-mesas/:id',
        component: EditarMesaComponent
      },
      {
        path: 'gestionar-mesas',
        component: GestionarMesaComponent
      },
      {
        path: 'ver-mesa/:id',
        component: VerMesaComponent
      },

      // Productos
      {
        path: 'crear-producto',
        component: EditarProductoComponent,
      },
      {
        path: 'editar-productos/:id',
        component: EditarProductoComponent
      },
      {
        path: 'gestionar-productos',
        component: GestionarProductoComponent
      },
      {
        path: 'ver-producto/:id',
        component: VerProductoComponent
      },

      // Usuarios
      {
        path: 'crear-usuario',
        component: EditarUsuarioComponent,
      },
      {
        path: 'editar-usuarios/:id',
        component: EditarUsuarioComponent
      },
      {
        path: 'gestionar-usuarios',
        component: GestionarUsuarioComponent
      },
      {
        path: 'ver-usuario/:id',
        component: VerUsuarioComponent
      },
      

      {
        path: '**',
        redirectTo: ''
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
