import { Usuario } from '../../usuarios/interface/usuario';
import { Mesa } from '../../mesas/interface/mesa';

export interface Pedido {
  id?: number;
  id_user?: number | null;
  id_mesa: number;   
  estado: string;
  fecha: string;
  total: number;
  created_at?: string;
  updated_at?: string;
  usuario?: Usuario;
  mesa?: Mesa;
}