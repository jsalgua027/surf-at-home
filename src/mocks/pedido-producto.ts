import { EstadoPedido } from "../core/enums/estado-pedido";
import { TipoUsuario } from "../core/enums/tipo-usuario";
import { Pedido } from "../core/pedido/pedido";
import { Producto } from "../core/producto/producto";
import { Usuario } from "../core/usuario/usuario";
import { PedidoProducto } from "../core/pedido-producto/pedido-producto";

export const PEDIDOS_PRODUCTOS_MOCK: PedidoProducto[] = [
  {
    id_pedido: 1,
    id_producto: 1,
    cantidad: 2,
    percio_unitario: 199.99
  },
  {
    id_pedido: 2,
    id_producto: 5,
    cantidad: 1,
    percio_unitario: 99.99
  },
  {
    id_pedido: 3,
    id_producto: 9,
    cantidad: 2,
    percio_unitario: 124.99
  },
  {
    id_pedido: 4,
    id_producto: 13,
    cantidad: 1,
    percio_unitario: 349.99
  },
  {
    id_pedido: 5,
    id_producto: 2,
    cantidad: 1,
    percio_unitario: 199.99
  },
  {
    id_pedido: 6,
    id_producto: 6,
    cantidad: 3,
    percio_unitario: 33.33
  },
  {
    id_pedido: 7,
    id_producto: 10,
    cantidad: 2,
    percio_unitario: 124.99
  },
  {
    id_pedido: 8,
    id_producto: 14,
    cantidad: 1,
    percio_unitario: 349.99
  },
  {
    id_pedido: 9,
    id_producto: 3,
    cantidad: 1,
    percio_unitario: 199.99
  },
  {
    id_pedido: 10,
    id_producto: 7,
    cantidad: 1,
    percio_unitario: 99.99
  }
];
