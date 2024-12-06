import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pedido } from '../../pedido/pedido';
import { PedidoProducto } from '../../pedido-producto/pedido-producto';

@Injectable({
  providedIn: 'root',
})
export class AdminPedidosComponentService {
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_orders.php'; // Asegúrate de actualizar esta URL según sea necesario
  private http = inject(HttpClient);
  private pedidoSubject: BehaviorSubject<Pedido[]> = new BehaviorSubject<
    Pedido[]
  >([]);
  private pedidoProductoSubject: BehaviorSubject<PedidoProducto[]> =
    new BehaviorSubject<PedidoProducto[]>([]);

  constructor() {}

  getPedidos(): Observable<Pedido[]> {
    this.http.get<Pedido[]>(`${this.apiUrl}`).subscribe(pedidos => {
       this.pedidoSubject.next(pedidos);
       }, error => { console.error('Error al obtener los pedidos:', error); 
        
       }); return this.pedidoSubject.asObservable();
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
