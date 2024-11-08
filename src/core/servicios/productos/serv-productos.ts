import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../../producto/producto';
import { PRODUCTOS_MOCK } from '../../../mocks/productos-mock';

@Injectable({ providedIn: 'root' })
export class ProductoService {
    constructor() { }
    getProductosPorCategoria(idCategoria: number): Observable<Producto[]> {
        const productos = PRODUCTOS_MOCK.filter(producto => producto.id_categoria === idCategoria); return of(productos);
    }


    searchProducts(term: string): Observable<Producto[]> { if (!term.trim()) { // Si el término de búsqueda está vacío, devuelve todos los productos
         return of(PRODUCTOS_MOCK);
        } 
        const productosFiltrados = PRODUCTOS_MOCK.filter(producto => producto.descripcion.toLowerCase().includes(term.toLowerCase()) );
         return of(productosFiltrados); }
}