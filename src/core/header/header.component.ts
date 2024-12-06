import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Producto } from '../producto/producto';
import { CarritoService } from '../servicios/carrito/carrito-service'; //servico del carrito
import { CommonModule } from '@angular/common';
import { UsersService } from '../servicios/usuarios/usuarios-service';
import { AuthService } from '../servicios/auth/auth.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDatepickerModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private carritoService = inject(CarritoService); // los servicios del carrito
  private offcanvasService = inject(NgbOffcanvas); // el menu desplegable
  private usersService = inject(UsersService); // servicios de los usuarios
  private router = inject(Router); // el enrutamiento
  private authService = inject(AuthService);

  closeResult = '';
  totalCompra: number = 0;

  productosCarrito: { producto: Producto; cantidad: number }[] = []; //array con los productos para el carrito

  loggedIn: boolean = false;
  currentUser?: Usuario | null = null;

  constructor() {}
  ngOnInit() {
    this.carritoService.obtenerCarrito().subscribe((productos) => {
      this.productosCarrito = productos;
      this.totalCompra = this.carritoService.calcularTotal();
    });

    this.usersService.currentUser$.subscribe((user) => {
      this.currentUser = user; // Actualiza currentUser
      this.loggedIn = !!user;
      console.log('Usuario suscrito en HeaderComponent:', this.currentUser);
    });
  }
  /*****GESTIÓN DEL PEDIDO***/

  hacePedido() {
    if (this.loggedIn && this.currentUser) {
      // Mostrar los datos del carrito en la consola
      console.log('Pedido realizado por el usuario:', this.currentUser);
      console.log('Productos en el carrito:', this.productosCarrito);
      console.log('Total de la compra:', this.totalCompra);
      // Aquí puedes implementar la llamada a la API para realizar el pedido
    } else {
      console.log('Debe iniciar sesión para confirmar el pedido');
      this.irALogin(); // Redirigir al login si no está logueado
    }
  }

  getProductoFotoUrl(producto: Producto): string {
    return `../../assets/Productos/${producto.foto_producto}`;
  }

  /**
   * Gestión de cantidades
   *
   * */

  aumentarCantidad(producto: Producto) {
    //aumentar
    this.carritoService.agregarProducto(producto);
    this.totalCompra = this.carritoService.calcularTotal();
  }

  disminuirCantidad(producto: Producto) {
    //disminuir
    this.carritoService.quitarProducto(producto);
    this.totalCompra = this.carritoService.calcularTotal();
  }

  /*Enrutamiento de la cabecera y el menu offcanvas*/
  irALogin() {
    this.router.navigate(['/login']);
  }

  irAInicio() {
    this.router.navigate(['/']);
  }

  irAProductos(idCategoria: number) {
    this.router.navigate(['/productos', idCategoria]);
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  openEnd(carrito: TemplateRef<any>) {
    this.offcanvasService.open(carrito, { position: 'end' });
  }

  /********Cierro sesión con el servicio de los usuarios*/

  logout() {
    this.usersService.logout();
    this.currentUser = null; // borro el usuario
    this.loggedIn = false; //Estado del inicio de la sesion a false
    this.productosCarrito=[]// vacio el carrito
    this.totalCompra=0; // reinico el total 
    this.router.navigate(['/']);
  }
}
