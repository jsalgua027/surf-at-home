import { Component, inject, OnInit, Type, ViewChild } from '@angular/core';
import { AdminProductosComponentService } from '../../core/servicios/admin-productos/admin-productos-service';
import { Producto } from '../../core/producto/producto';
import { Categoria } from '../../core/categoria/categoria';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.scss',
})
export class AdminProductosComponent implements OnInit {
  categorias: Categoria[] = []; //array de categorias
  articulosFiltrados: Producto[] = []; // array de productos flitrados  para la tabla
  categoriaSeleccionada: number | null = null; // selector de categorias
  private productosService = inject(ProductoService);
  private adminProductosService = inject(AdminProductosComponentService); // servicios del admin product
  private router = inject(Router); // para rediriguir al componente que quiero

  // variable para crear productos
  nuevoProducto: Producto = {
    id_producto: '',
    marca_producto: '',
    precio: 0,
    foto_producto: '',
    id_categoria: 0,
    stock: 0,
    descripcion: '',
  };
  imagenes: FileList | null = null;
  productoParaEliminar: number | null = null;

  @ViewChild('modalContent', { static: true }) modalContent: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.adminProductosService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.articulosFiltrados = []; // en la primera carga quiero el array vacio
  }

  //gestion de imagenes
  getProductoFotoUrl(producto: Producto): string {
    return `../../assets/Productos/${producto.foto_producto}`;
  }
  // fltrador de productos segun categoria
  filtrarArticulos(event: Event) {
    const seleccion = (event.target as HTMLSelectElement).value;
    if (seleccion !== '') {
      this.categoriaSeleccionada = parseInt(seleccion, 10); // mi interface usa number
      this.adminProductosService
        .getProductosPorCategoria(this.categoriaSeleccionada)
        .subscribe((productos) => {
          this.articulosFiltrados = productos;
        });
    } else {
      this.categoriaSeleccionada = null;
      this.articulosFiltrados = [];
    }
  }

 

  editarProducto(id: string) {
    this.router.navigate(['/editar-producto', id]);
  }

  //GESTIÓN DE LA CREACIÓN DE PRODUCTOS

  // filtro de productos según categoría
  actualizarFiltroArticulos(): void {
    if (this.categoriaSeleccionada !== null) {
      this.adminProductosService
        .getProductosPorCategoria(this.categoriaSeleccionada)
        .subscribe((productos) => {
          this.articulosFiltrados = productos;
        });
    } else {
      this.articulosFiltrados = [];
    }
  }

  // manejar el cambio en el input de archivos
  onFileChange(event: any): void {
    this.imagenes = event.target.files;
  }

  agregarProducto(): void {
    if (this.imagenes && this.imagenes.length > 0) {
      const productoData = {
        ...this.nuevoProducto,
        foto_producto: this.imagenes[0].name,
      };

      this.adminProductosService.agregarProducto(productoData).subscribe(
        (response) => {
          console.log('Producto creado es:', JSON.stringify(response));
          this.actualizarFiltroArticulos();
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      console.error('No se seleccionaron imágenes.');
    }
  }

  /******GESTIÓN DEL BORRADO*****/


   // gestión de la modal de confirmación de borrado
   open(id: string) {
    this.productoParaEliminar = parseInt(id, 10);
    const modalRef = this.modalService.open(this.modalContent);
    modalRef.result.then(
      (result) => {
        if (result === 'Eliminar') {
          this.confirmDelete(modalRef);
        }
      },
      (reason) => {
        console.log('Modal dismissed', reason);
      }
    );
  }

  confirmDelete(modalRef: any) {
    if (this.productoParaEliminar !== null) {
      this.adminProductosService
        .eliminarProducto(this.productoParaEliminar)
        .subscribe(
          (response) => {
            console.log('Producto eliminado:', response);
            this.actualizarFiltroArticulos(); // Actualizar el filtro después de eliminar un producto
            modalRef.close();
          },
          (error) => {
            console.error('Error al eliminar el producto:', error);
          }
        );
      this.productoParaEliminar = null;
    }
  }
}
