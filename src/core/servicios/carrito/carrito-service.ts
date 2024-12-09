import { Injectable, inject} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Pedido } from '../../pedido/pedido';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { EstadoPedido } from '../../enums/estado-pedido';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiProd= 'http://localhost/tiendaSurf/api/get_users.php';
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_orders.php'; 
  private http = inject(HttpClient);

  private carrito: { producto: Producto; cantidad: number }[] = [];
  private carritoSubject: BehaviorSubject<
    { producto: Producto; cantidad: number }[] > = new BehaviorSubject(this.carrito);

  /********GESTIÓN GENERAR PEDIDO CON LA API *********** */
  generarPedido(id_usuario: number): Observable<any> {
    console.log("entra en generar pedido en el servico ")
    const total = this.calcularTotal();
    const productos = this.carrito.map((item) => ({
      id_producto: item.producto.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.producto.precio,
    }));
    const pedido: any = {
     id_usuario,
      estado_pedido:EstadoPedido.pendiente,
      total,
       productos
         };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(this.apiProd, pedido, httpOptions);
  }

  /***GESTIÓN DEL CARRITO A NIVEL FRONT */
  agregarProducto(producto: Producto): void {
    const item = this.carrito.find(
      (p) => p.producto.id_producto === producto.id_producto
    );
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
    this.carritoSubject.next(this.carrito);
  }

  quitarProducto(producto: Producto): void {
    const item = this.carrito.find(
      (p) => p.producto.id_producto === producto.id_producto
    );
    if (item) {
      item.cantidad--;
      if (item.cantidad <= 0) {
        this.carrito = this.carrito.filter(
          (p) => p.producto.id_producto !== producto.id_producto
        );
      }
      this.carritoSubject.next(this.carrito);
    }
  }

  obtenerCarrito(): Observable<{ producto: Producto; cantidad: number }[]> {
    return this.carritoSubject.asObservable();
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }

  calcularTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  }
}
