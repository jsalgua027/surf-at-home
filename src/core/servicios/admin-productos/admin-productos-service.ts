import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Categoria } from '../../categoria/categoria';
import { ProductoService } from '../productos/serv-productos';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminProductosComponentService {
  private categoriasSubject: BehaviorSubject<Categoria[]> = new BehaviorSubject<
    Categoria[]
  >([]);
  private productosSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<
    Producto[]
  >([]);

  private apiUrl =
    'http://localhost/Proyectos/surf-at-home/api/get_products.php';
  private http = inject(HttpClient);

  constructor(private productoService: ProductoService) {}

  /*GSTIÓN PARA LAS TABLAS*/

  getCategorias(): Observable<Categoria[]> {
    return this.categoriasSubject.asObservable();
  }
  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }
  getProductosPorCategoria(idCategoria: number): Observable<Producto[]> {
    return this.productoService.getProductosPorCategoriaApi(idCategoria);
  }

  /**GESTIÓN PARA LAS LLAMADAS A LA API  */

  agregarProducto(productoData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
      console.log("el dato que recibe el servicio agregarProcuto es:" +JSON.stringify(productoData))
    return this.http.post<any>(this.apiUrl, productoData).pipe(
            tap((response) => {
        const productosActuales = this.productosSubject.value;
        const nuevoProducto = {
          id_producto: response.id_producto,
          marca_producto: response.marca_producto, 
          precio: response.precio,
          foto_producto: response.foto_producto,
          id_categoria: response.id_categoria,
          stock: response.stock,
          descripcion: response.descripcion,
        };
        this.productosSubject.next([...productosActuales, nuevoProducto]);
      }),
      catchError((error) => {
        console.error('Error al agregar el producto:', error);
        return throwError(error);
      })
    );
  }

  eliminarProducto(id_producto: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .delete<any>(`${this.apiUrl}?id_producto=${id_producto}`, httpOptions)
      .pipe(
        tap(() => {
          const idProductoString = id_producto.toString();
          const productosActuales = this.productosSubject.value.filter(
            (producto) => producto.id_producto.toString() !== idProductoString
          );
          this.productosSubject.next(productosActuales);
        }),
        catchError((error) => {
          console.error('Error al eliminar el producto:', error);
          return throwError(error);
        })
      );
  }
}
