import { Component, inject, Input, OnInit } from '@angular/core';
import { Producto } from '../../core/producto/producto';
import { PRODUCTOS_MOCK } from '../../mocks/productos-mock';
import { Categoria } from '../../core/categoria/categoria';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
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
  private route = inject(ActivatedRoute);

  constructor() { }


  ngOnInit() {
    // Obtener el parámetro de la ruta para la categoría
    this.route.params.subscribe(params => {
      this.id_categoria = +params['idCategoria'];
      this.cargarProductos();
    });
    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.productoService.searchProducts(term || ''))
    ).subscribe(products => {
      this.filteredProducts = products;
      console.log('Productos filtrados:', JSON.stringify(products, null, 2));
      
    });


  }

  cargarProductos() {
    if (this.id_categoria) {
      this.productoService.getProductosPorCategoria(this.id_categoria).subscribe(
        (productos: Producto[]) => {
          this.productos = productos; this.filteredProducts = productos;
        });
    }
  }
  agregarAlCarrito(producto: Producto) { // Lógica para añadir el producto al carrito 
    console.log('Producto añadido al carrito:', producto);
    // Aquí puedes añadir la lógica para agregar al carrito, como una llamada a un servicio de carrito }
  }
}

 