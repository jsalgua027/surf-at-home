import { Component, inject, Input, OnInit } from '@angular/core';
import { Producto } from '../../core/producto/producto';
import { PRODUCTOS_MOCK } from '../../mocks/productos-mock';
import { Categoria } from '../../core/categoria/categoria';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {
  filteredProducts: Producto[] = [];
   searchTerm = new FormControl('');
  productos: Producto[] = []
  @Input() id_categoria?: number;
  private productoService = inject(ProductoService);

  constructor() { }


  ngOnInit() {
     this.cargarProductos();
      this.searchTerm.valueChanges.pipe(
        debounceTime(500),
         distinctUntilChanged(),
          switchMap(term => this.productoService.searchProducts(term||''))
        ).subscribe(products => {
           this.filteredProducts = products;
            console.log('Productos filtrados:', JSON.stringify(products, null, 2));
           });
           }

  cargarProductos() {
    if (this.id_categoria) {
      this.productoService.getProductosPorCategoria(this.id_categoria).subscribe(
        (productos: Producto[]) => {
           this.productos = productos; this.filteredProducts = productos; });
  }
}
}