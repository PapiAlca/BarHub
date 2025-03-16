import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { EditarMesaComponent } from './pages/mesas/editar-mesas/editar-mesas.component';
import { GestionarMesaComponent } from './pages/mesas/gestionar-mesas/gestionar-mesas.component';
import { VerMesaComponent } from './pages/mesas/ver-mesa/ver-mesa.component';

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
        path: 'crear-mesas',
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
