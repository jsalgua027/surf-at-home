import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Categoria } from '../../categoria/categoria';
import { CATEGORIAS_MOCK } from '../../../mocks/categoria-mock';
import { PRODUCTOS_MOCK } from '../../../mocks/productos-mock';

@Injectable({
  providedIn: 'root',
})
export class AdminProductosComponentService {
  private categoriasSubject: BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>(CATEGORIAS_MOCK);
  private productosSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(PRODUCTOS_MOCK);

  constructor() {}
  
  getCategorias(): Observable<Categoria[]> {
    return this.categoriasSubject.asObservable();
  }
  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }
  agregarProducto(producto: Producto) {
    const productosActuales = this.productosSubject.value;
    this.productosSubject.next([...productosActuales, producto]);
  }
}
