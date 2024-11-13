import { Component, inject, OnInit, Type, ViewChild } from '@angular/core';
import { AdminProductosComponentService } from '../../core/servicios/admin-productos/admin-productos-service';
import { Producto } from '../../core/producto/producto';
import { Categoria } from '../../core/categoria/categoria';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.scss',
})
export class AdminProductosComponent implements OnInit {
  categorias: Categoria[] = []; //array de categorias

  articulosFiltrados: Producto[] = []; // array de productos flitrados  para la tabla

  categoriaSeleccionada: number | null = null; // selector de categorias

  private adminProductosService = inject(AdminProductosComponentService); // servicios del admin product

  @ViewChild('modalContent', { static: true }) modalContent: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.adminProductosService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.articulosFiltrados = []; // en la primera carga quiero el array vacio
  }

  // fltrador de productos segun categoria
  filtrarArticulos(event: Event) {
    const seleccion = (event.target as HTMLSelectElement).value;
    if (seleccion !== '') {
      this.categoriaSeleccionada = parseInt(seleccion, 10); // mi interface usa number
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

  //este va a llamar al servicio que va a llmar a la api
  agregarProducto(producto: Producto) {
    this.adminProductosService.agregarProducto(producto);
  }

  // gestión de la modal de confirmación de borrado
  open(id: string) {
    const modalRef = this.modalService.open(this.modalContent);
    modalRef.result.then(
      (result) => {
        if (result === 'Eliminar') {
          this.confirmDelete();
        }
      },
      (reason) => {
        console.log('Modal dismissed', reason);
      }
    );
  }
  confirmDelete() {}
}
