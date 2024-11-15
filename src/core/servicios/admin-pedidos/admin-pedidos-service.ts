import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PEDIDOS_MOCK } from '../../../mocks/pedidos-mock';
import { PEDIDOS_PRODUCTOS_MOCK } from '../../../mocks/pedido-producto';
import { Pedido } from '../../pedido/pedido';
import { PedidoProducto } from '../../pedido-producto/pedido-producto';

@Injectable({
  providedIn: 'root',
})
export class AdminPedidosComponentService {
  private pedidoSubject: BehaviorSubject<Pedido[]> = new BehaviorSubject<
    Pedido[]
  >(PEDIDOS_MOCK);
  private pedidoProductoSubject: BehaviorSubject<PedidoProducto[]> =
    new BehaviorSubject<PedidoProducto[]>(PEDIDOS_PRODUCTOS_MOCK);

  constructor() {}

  getPedidos(): Observable<Pedido[]> {
    return this.pedidoSubject.asObservable();
  }

  getPedidosProducto(): Observable<PedidoProducto[]> {
    return this.pedidoProductoSubject.asObservable();
  }
  updatePedidos(pedidos: Pedido[]): void {
    this.pedidoSubject.next(pedidos);
  }

  updatePedidosProducto(pedidosProducto: PedidoProducto[]): void {
    this.pedidoProductoSubject.next(pedidosProducto);
  }
}
