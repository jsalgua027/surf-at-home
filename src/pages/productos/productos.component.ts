import { Component, inject, Input, OnInit } from '@angular/core';
import { Producto } from '../../core/producto/producto';
import { PRODUCTOS_MOCK } from '../../mocks/productos-mock';
import { Categoria } from '../../core/categoria/categoria';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../core/servicios/carrito/carrito-service';

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
  private productoService = inject(ProductoService);// servicio del produtco
  private route = inject(ActivatedRoute); // enrutamiento
  private carritoService=inject(CarritoService);//servicio del carrito

  constructor() { }


  ngOnInit() {
    // Obtener el parámetro de la ruta para la categoría
    this.route.params.subscribe(params => {
      this.id_categoria = +params['idCategoria'];
      this.cargarProductos();
     
    });
    this.searchTerm.valueChanges.pipe(//filto de busqueda
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.productoService.searchProducts(term || ''))
    ).subscribe(products => {
      this.filteredProducts = products;
    //  console.log('Productos filtrados:', JSON.stringify(products, null, 2));
      
    });


  }

  getProductoFotoUrl(producto: Producto): string {
     return `../../assets/Productos/${producto.foto_producto}`;
     }


  cargarProductos() {
    if (this.id_categoria) {
      this.productoService.getProductosPorCategoriaApi(this.id_categoria).subscribe(
        (productos: Producto[]) => {
          this.productos = productos;
           this.filteredProducts = productos;
        });
    }
  }
  agregarAlCarrito(producto: Producto) { // Lógica para añadir el producto al carrito 
    this.carritoService.agregarProducto(producto);//añado producto
     console.log('Producto añadido al carrito:', producto);
  }
}

 