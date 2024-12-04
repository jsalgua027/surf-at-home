import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Categoria } from '../../categoria/categoria';
import { ProductoService } from '../productos/serv-productos';


@Injectable({
  providedIn: 'root',
})
export class AdminProductosComponentService {
  private categoriasSubject: BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>([]);
  private productosSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);

  constructor(private productoService: ProductoService) {
   // this.loadProductos();
  }
  
  getCategorias(): Observable<Categoria[]> {
    return this.categoriasSubject.asObservable();
  }
  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();

  }
  getProductosPorCategoria(idCategoria: number): Observable<Producto[]> {
     return this.productoService.getProductosPorCategoriaApi(idCategoria); 
    }


  agregarProducto(producto: Producto) {
    const productosActuales = this.productosSubject.value;
    this.productosSubject.next([...productosActuales, producto]);
  }

  //llamo a los servicios del producto para la carga de datos
  private loadProductos() {
     this.productoService.getAllProducts().subscribe((productos) => {
      this.productosSubject.next(productos);
     }); }

}
