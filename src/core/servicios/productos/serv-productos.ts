import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../../producto/producto';
import { PRODUCTOS_MOCK } from '../../../mocks/productos-mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductoService {
    
  private apiUrl = 'http://localhost/Proyectos/api/get_products.php';
  private http = inject(HttpClient);

  constructor() {}
  getProductosPorCategoria(idCategoria: number): Observable<Producto[]> {
    const productos = PRODUCTOS_MOCK.filter(
      (producto) => producto.id_categoria === idCategoria
    );
    return of(productos);
  }

  searchProducts(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      // Si el término de búsqueda está vacío, devuelve todos los productos
      return of(PRODUCTOS_MOCK);
    }
    const productosFiltrados = PRODUCTOS_MOCK.filter((producto) =>
      producto.descripcion.toLowerCase().includes(term.toLowerCase())
    );
    return of(productosFiltrados);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError<any[]>('getAllProducts', [])));
  }
  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
