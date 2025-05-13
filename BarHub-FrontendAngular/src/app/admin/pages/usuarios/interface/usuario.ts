export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    habilitado: boolean;
    roles: RolUsuario[];
    created_at?: string;
    updated_at?: string;
}

export interface Rol {
    id?: number;
    nombre: string;
}

export interface RolUsuario {
    rol_id: number;
    usuario_id: number;
    rol?: Rol;
}