import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Categoria } from '../../categoria/categoria';
import { ProductoService } from '../productos/serv-productos';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminEditarProductosService {
  private apiUrl =
    'http://localhost/Proyectos/surf-at-home/api/get_products.php';
  private http = inject(HttpClient);

  actualizarProducto(productoData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(
      'el dato que recibe el servicio actualizarProducto es:',
      productoData
    );
    return this.http.put<any>(this.apiUrl, productoData).pipe(
      tap((response) => {
        console.log('Producto actualizado:', response);
      }),
      catchError((error) => {
        console.error('Error al actualizar el producto:', error);
        return throwError(error);
      })
    );
  }
}
