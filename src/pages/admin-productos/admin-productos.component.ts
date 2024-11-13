import { Component, inject, OnInit } from '@angular/core';
import { AdminProductosComponentService } from '../../core/servicios/admin-productos/admin-productos-service';
import { Producto } from '../../core/producto/producto';
import { Categoria } from '../../core/categoria/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.scss',
})
export class AdminProductosComponent implements OnInit {
  categorias: Categoria[] = [];
  articulosFiltrados: Producto[] = [];
  categoriaSeleccionada: number | null = null;
  private adminProductosService = inject(AdminProductosComponentService);

  ngOnInit(): void {
    this.adminProductosService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.articulosFiltrados = [];
  }

  filtrarArticulos(event: Event) {
    const seleccion = (event.target as HTMLSelectElement).value;
    if (seleccion !== '') {
      this.categoriaSeleccionada = parseInt(seleccion, 10);
      this.adminProductosService.getProductos().subscribe((productos) => {
        this.articulosFiltrados = productos.filter(
          (articulo) => articulo.id_categoria === this.categoriaSeleccionada
        );
      });
    } else {
      this.categoriaSeleccionada = null;
      this.articulosFiltrados = [];
    }
  }
  agregarProducto(producto: Producto) {
    this.adminProductosService.agregarProducto(producto);
  }
}
