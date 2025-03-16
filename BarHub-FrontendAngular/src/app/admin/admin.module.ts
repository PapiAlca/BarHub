import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { GestionarEquiposComponent } from './pages/equipos/gestionar-equipos/gestionar-equipos.component';
import { VerEquiposComponent } from './pages/equipos/ver-equipos/ver-equipos.component';
import { EditarEquiposComponent } from './pages/equipos/editar-equipos/editar-equipos.component';
import { GestionarEstacionMeteorologicaComponent } from './pages/estacion-meteorologica/gestionar-estacion-meteorologica/gestionar-estacion-meteorologica.component';
import { VerEstacionMeteorologicaComponent } from './pages/estacion-meteorologica/ver-estacion-meteorologica/ver-estacion-meteorologica.component';
import { EditarEstacionMeteorologicaComponent } from './pages/estacion-meteorologica/editar-estacion-meteorologica/editar-estacion-meteorologica.component';
import { GestionarParametrosConfiguracionComponent } from './pages/parametros-configuracion/gestionar-parametros-configuracion/gestionar-parametros-configuracion.component';
import { EditarParametrosConfiguracionComponent } from './pages/parametros-configuracion/editar-parametros-configuracion/editar-parametros-configuracion.component';
import { VerParametrosConfiguracionComponent } from './pages/parametros-configuracion/ver-parametros-configuracion/ver-parametros-configuracion.component';
import { VerPrevisionesComponent } from './pages/previsiones/ver-previsiones/ver-previsiones.component';
import { EditarPrevisionesComponent } from './pages/previsiones/editar-previsiones/editar-previsiones.component';
import { GestionarPrevisionesComponent } from './pages/previsiones/gestionar-previsiones/gestionar-previsiones.component';
import { GestionarRiegoPlanificadoComponent } from './pages/riego-planificado/gestionar-riego-planificado/gestionar-riego-planificado.component';
import { VerRiegoPlanificadoComponent } from './pages/riego-planificado/ver-riego-planificado/ver-riego-planificado.component';
import { EditarRiegoPlanificadoComponent } from './pages/riego-planificado/editar-riego-planificado/editar-riego-planificado.component';
import { EditarTareaRiegoComponent } from './pages/tarea-riego/editar-tarea-riego/editar-tarea-riego.component';
import { VerTareaRiegoComponent } from './pages/tarea-riego/ver-tarea-riego/ver-tarea-riego.component';
import { GestionarTareaRiegoComponent } from './pages/tarea-riego/gestionar-tarea-riego/gestionar-tarea-riego.component';
import { GestionarUsuariosComponent } from './pages/usuarios/gestionar-usuarios/gestionar-usuarios.component';
import { VerUsuariosComponent } from './pages/usuarios/ver-usuarios/ver-usuarios.component';
import { EditarUsuariosComponent } from './pages/usuarios/editar-usuarios/editar-usuarios.component';
import { EditarZonaComponent } from './pages/zonas/editar-zonas/editar-zonas.component';
import { VerZonaComponent } from './pages/zonas/ver-zona/ver-zona.component';
import { GestionarZonaComponent } from './pages/zonas/gestionar-zonas/gestionar-zonas.component';

@NgModule({
  declarations: [
    BienvenidaComponent,
    GestionarEquiposComponent,
    VerEquiposComponent,
    EditarEquiposComponent,
    GestionarEstacionMeteorologicaComponent,
    VerEstacionMeteorologicaComponent,
    EditarEstacionMeteorologicaComponent,
    GestionarParametrosConfiguracionComponent,
    EditarParametrosConfiguracionComponent,
    VerParametrosConfiguracionComponent,
    VerPrevisionesComponent,
    EditarPrevisionesComponent,
    GestionarPrevisionesComponent,
    GestionarRiegoPlanificadoComponent,
    VerRiegoPlanificadoComponent,
    EditarRiegoPlanificadoComponent,
    EditarTareaRiegoComponent,
    VerTareaRiegoComponent,
    GestionarTareaRiegoComponent,
    GestionarUsuariosComponent,
    VerUsuariosComponent,
    EditarUsuariosComponent,
    EditarZonaComponent,
    VerZonaComponent,
    GestionarZonaComponent
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
