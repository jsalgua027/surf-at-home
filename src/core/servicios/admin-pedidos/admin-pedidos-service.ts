import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pedido } from '../../pedido/pedido';
import { PedidoProducto } from '../../pedido-producto/pedido-producto';

@Injectable({
  providedIn: 'root',
})
export class AdminPedidosComponentService {
  private apiProd= 'http://localhost/surf-at-home/api/get_users.php';
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_orders.php'; 
  private http = inject(HttpClient);
  private pedidoSubject: BehaviorSubject<Pedido[]> = new BehaviorSubject<Pedido[]>([]);
  private pedidoProductoSubject: BehaviorSubject<PedidoProducto[]> =new BehaviorSubject<PedidoProducto[]>([]);

  constructor() {}

  getPedidos(): Observable<Pedido[]> {
    this.http.get<Pedido[]>(`${this.apiProd}`).subscribe(pedidos => {
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
  
  //metodo que cambia el estado del pedido
  cambiarEstadoPedido(id_pedido: number): Observable<any> { 
    const body = { id_pedido }; 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.http.put<any>(`${this.apiProd}`, body, httpOptions).pipe(
       catchError(error => { console.error('Error al cambiar el estado del pedido:', error); 
        return throwError(error); }) 
      ); 
    }

}
