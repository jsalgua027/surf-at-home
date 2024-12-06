import { Component, OnInit, inject } from '@angular/core';
import { AdminPedidosComponentService } from '../../core/servicios/admin-pedidos/admin-pedidos-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../core/pedido/pedido';
import { EstadoPedido } from '../../core/enums/estado-pedido';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.scss',
})
export class AdminPedidosComponent implements OnInit {
  estadoPedido = EstadoPedido; //enum del estado
  pedidos: Pedido[] = []; // array de los pedidos
  filteredPedidos: Pedido[] = []; //array donde filtro los pedidos
  selectedCategoria?: EstadoPedido; //variable para la seleccion
  private adminPedidosService = inject(AdminPedidosComponentService);
  constructor() {}

  ngOnInit(): void {
    this.adminPedidosService.getPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
      this.filteredPedidos = data;
    });
  }

  onCategoriaChange(): void {
    if (this.selectedCategoria) {
      this.filteredPedidos = this.pedidos.filter(
        (pedido) => pedido.estado_pedido === this.selectedCategoria
      );
    } else {
      this.filteredPedidos = this.pedidos; // Si no hay categoría seleccionada, mostramos todos los pedidos
    }
  }

  //método para cambiar el estado del pedido a completado
  completarPedido(id_pedido: number): void {
    this.adminPedidosService.cambiarEstadoPedido(id_pedido).subscribe(
      (response) => {
        console.log('Pedido completado:', response);
        // Actualizar el estado del pedido en el array
        this.pedidos = this.pedidos.map((pedido) =>
          pedido.id_pedido === id_pedido
            ? { ...pedido, estado_pedido: EstadoPedido.completado }
            : pedido
        );
        this.filteredPedidos = this.pedidos; // Actualizar la lista filtrada
      },
      (error) => {
        console.error('Error al completar el pedido:', error);
      }
    );
  }
}
