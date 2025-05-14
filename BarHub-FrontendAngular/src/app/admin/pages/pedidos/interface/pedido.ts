export interface Pedido {
    id?: number;
    userId?: number | null;
    mesaId: number;   
    estado: string;
    fecha: string;
    total: number;
    created_at?: string;
    updated_at?: string;
}    