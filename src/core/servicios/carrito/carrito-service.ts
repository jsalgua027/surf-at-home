import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../producto/producto';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {
    private carrito: { producto: Producto, cantidad: number }[] = [];
    private carritoSubject: BehaviorSubject<{ producto: Producto, cantidad: number }[]> = new BehaviorSubject(this.carrito)

    agregarProducto(producto: Producto): void {
        const item = this.carrito.find(p => p.producto.id_producto === producto.id_producto);
        if (item) {
            item.cantidad++;
        } else {
            this.carrito.push({ producto, cantidad: 1 });
        }
        this.carritoSubject.next(this.carrito);
    }

    quitarProducto(producto: Producto): void {
        const item = this.carrito.find(p => p.producto.id_producto === producto.id_producto);
        if (item) {
            item.cantidad--;
            if (item.cantidad <= 0) {
                this.carrito = this.carrito.filter(p => p.producto.id_producto !== producto.id_producto);
            }
            this.carritoSubject.next(this.carrito);
        }
    }

    obtenerCarrito(): Observable<{ producto: Producto, cantidad: number }[]> {
        return this.carritoSubject.asObservable();
    }

    limpiarCarrito(): void {
        this.carrito = [];
        this.carritoSubject.next(this.carrito);
    }
}
