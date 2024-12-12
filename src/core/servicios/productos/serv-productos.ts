import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../../producto/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_products.php';
  private apiProd= 'http://localhost/surf-at-home/api/get_products.php';
  private http = inject(HttpClient);

  constructor() {}
 
//buscador de productos
  searchProducts(term: string): Observable<Producto[]> {
    return this.getAllProducts().pipe(
      map((productos) =>
        productos.filter((producto) =>
          producto.descripcion.toLowerCase().includes(term.toLowerCase())
        )
      ),
      catchError(this.handleErrorSearch<Producto[]>('searchProducts', []))
    );
  }

  // Manejo de errores private
  handleErrorSearch<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Obtener todos los productos
  getAllProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiProd)
      .pipe(catchError(this.handleError<any[]>('getAllProducts', [])));
  }
  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Obtener productos por categoría
  getProductosPorCategoriaApi(idCategoria: number): Observable<Producto[]> {
    const url = `${this.apiProd}?categoria=${idCategoria}`;
    return this.http
      .get<Producto[]>(url)
      .pipe(
        catchError(
          this.handleErrorCat<Producto[]>('getProductosPorCategoria', [])
        )
      );
  }

  // Manejo de errores
  private handleErrorCat<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable((observer) => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }
}
