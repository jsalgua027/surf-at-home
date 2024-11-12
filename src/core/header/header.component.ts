import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Producto } from '../producto/producto';
import { CarritoService } from '../servicios/carrito/carrito-service'; //servico del carrito
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		NgbDatepickerModule,
		CommonModule
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
	private carritoService = inject(CarritoService);// los servicios del carrito
	private offcanvasService = inject(NgbOffcanvas);// el menu desplegable
	private router = inject(Router);// el enrutamiento
	closeResult = '';
	totalCompra: number = 0;

	productosCarrito: { producto: Producto, cantidad: number }[] = [];//array con los productos para el carrito

	constructor() { }
	ngOnInit() {
		this.carritoService.obtenerCarrito().subscribe((productos) => {
			this.productosCarrito = productos;
			this.totalCompra = this.carritoService.calcularTotal();
		});
	}

 /**
  * Gestión de cantidades
  * 
  * */

	aumentarCantidad(producto: Producto) {//aumentar
		this.carritoService.agregarProducto(producto);
		this.totalCompra = this.carritoService.calcularTotal();
	}

	disminuirCantidad(producto: Producto) {//disminuir

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
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
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

	hacePedido() {

	}


}
