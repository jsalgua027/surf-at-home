import { Pedido } from "../core/pedido/pedido";
import { EstadoPedido } from "../core/enums/estado-pedido";


export const PEDIDOS_MOCK: Pedido[] = [
  {
    id_pedido: 1,
    fecha: new Date('2024-01-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 1,
    total: 199.99
  },
  {
    id_pedido: 2,
    fecha: new Date('2024-02-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 2,
    total: 99.99
  },
  {
    id_pedido: 3,
    fecha: new Date('2024-03-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 3,
    total: 249.99
  },
  {
    id_pedido: 4,
    fecha: new Date('2024-04-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 4,
    total: 349.99
  },
  {
    id_pedido: 5,
    fecha: new Date('2024-05-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 1,
    total: 199.99
  },
  {
    id_pedido: 6,
    fecha: new Date('2024-06-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 2,
    total: 99.99
  },
  {
    id_pedido: 7,
    fecha: new Date('2024-07-01'),
    estado_pedido: EstadoPedido.completado,
    id_usuario: 3,
    total: 249.99
  },
  {
    id_pedido: 8,
    fecha: new Date('2024-08-01'),
    estado_pedido: EstadoPedido.pendiente,
    id_usuario: 4,
    total: 349.99
  },
  {
    id_pedido: 9,
    fecha: new Date('2024-09-01'),
    estado_pedido: EstadoPedido.pendiente,
    id_usuario: 1,
    total: 199.99
  },
  {
    id_pedido: 10,
    fecha: new Date('2024-10-01'),
    estado_pedido: EstadoPedido.pendiente,
    id_usuario: 2,
    total: 99.99
  }
];
