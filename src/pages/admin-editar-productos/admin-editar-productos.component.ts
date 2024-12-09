import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminEditarProductosService } from '../../core/servicios/admin-editar-productos/admin-editar-productos-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminProductosComponentService } from '../../core/servicios/admin-productos/admin-productos-service';
import { Producto } from '../../core/producto/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-editar-productos.component.html',
  styleUrl: './admin-editar-productos.component.scss',
})
export class AdminEditarProductosComponent {
  private editarProductosService = inject(AdminEditarProductosService); // injecto los servicios de editar
  idProducto: string = '';
  producto: Producto | null = null;
  imagenes: FileList | null = null;
  private router = inject(ActivatedRoute);
  private rutas = inject(Router);
  private adminProductsService = inject(AdminProductosComponentService); // inyecto los servicios del admin-product

  ngOnInit(): void {
    this.idProducto = this.router.snapshot.paramMap.get('id')!; // recojo de la ruta el id
   // console.log('ID del producto a editar: ', this.idProducto);
    this.adminProductsService
      .obtenerProductoSeleccionado()
      .subscribe((producto) => {
        if (producto && producto.id_producto.toString() === this.idProducto) {
          this.producto = producto;
          //console.log('el producto que te traes del admin-protuc es:' +JSON.stringify(producto, null, 2));
        } else {
          console.error('Producto no encontrado o ID no coincide.');
        }
      });
  }

  onFileChange(event: any): void {
    this.imagenes = event.target.files;
  }

  guardarCambios() {
    if (this.producto) {
      // Actualizar manualmente los valores
      const marcaInput = (document.getElementById('marca') as HTMLInputElement).value;
      const descripcionInput = (document.getElementById('descripcion') as HTMLInputElement).value;
      const precioInput = +(document.getElementById('precio') as HTMLInputElement).value;
      const stockInput = +(document.getElementById('stock') as HTMLInputElement).value;
      this.producto.marca_producto = marcaInput;
      this.producto.descripcion = descripcionInput;
      this.producto.precio = precioInput;
      this.producto.stock = stockInput;
      // creo FormData para mandarlos
      const formData = new FormData();
      formData.append('id_producto', this.producto.id_producto.toString());
      formData.append('marca_producto', this.producto.marca_producto);
      formData.append('precio', this.producto.precio.toString());
      formData.append('id_categoria', this.producto.id_categoria.toString());
      formData.append('stock', this.producto.stock.toString());
      formData.append('descripcion', this.producto.descripcion);

      
      if (this.imagenes && this.imagenes.length > 0) {
         formData.append('file', this.imagenes[0]); 
        }

      //LLamo al servicio de admin-editar-produtos
      this.editarProductosService.actualizarProducto(formData).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
    }
    this.rutas.navigate(['/admin']);
  }

  volver() {
    this.rutas.navigate(['/admin']);
  }
}
