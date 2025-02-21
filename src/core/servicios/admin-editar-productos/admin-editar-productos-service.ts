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
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/editProducts.php';
  private apiProd= 'https://surf-at-home.endinahosting.com/surf-at-home/api/editProducts.php';

  private http = inject(HttpClient);

  actualizarProducto(productoData: FormData): Observable<any> {
  
    return this.http.post<any>(this.apiUrl, productoData).pipe(
      tap((response) => {
        console.log('Producto actualizado service:', response);
      }),
      catchError((error) => {
        console.error('Error al actualizar el producto (desde el service):', error);
        return throwError(error);
      })
    );
  }
}
 