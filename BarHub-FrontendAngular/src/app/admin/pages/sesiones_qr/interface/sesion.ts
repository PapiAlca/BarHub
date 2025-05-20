import { Usuario } from '../../usuarios/interface/usuario';
import { Mesa } from '../../mesas/interface/mesa';

export interface Sesion {
    id?: number;
    id_user?: number | null;
    id_mesa: number;   
    token: string;
    fecha_sesion: string;
    created_at?: string;
    updated_at?: string;

    usuario?: Usuario;
    mesa?: Mesa;
}