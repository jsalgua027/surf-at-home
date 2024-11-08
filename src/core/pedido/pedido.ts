import { EstadoPedido } from "../enums/estado-pedido";

export interface Pedido{
    id_pedido:number;
    fecha:Date;
    estado_pedido:EstadoPedido;
    id_usuario:number;
    total:number
}