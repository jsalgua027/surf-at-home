
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { HttpClient } from '@angular/common/http';
import {Producto} from '../../core/producto/producto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  productos: Producto[] = [];
  categoriaSeleccionada: number = 3;
 private servicioProducto=inject(ProductoService);

constructor(private router: Router){}
  ngOnInit(): void {
    //llamada al servicio de todos los prodcutos
    this.servicioProducto.getAllProducts().subscribe(
      products => {//console.log("LOS PRODUCTOS DESDE LA LLAMADA DE LA API:"+JSON.stringify(products,null,2));

       });
       //llamada al método de cargarProductos indicando categoria
       this.cargarProductosPorCategoria(this.categoriaSeleccionada);

  }


irAProductos(idCategoria: number) { 
  this.router.navigate(['/productos', idCategoria]);
 }

 // metodo que llama al servicio en producto que llama aa la api
 cargarProductosPorCategoria(idCategoria: number): void {
  this.servicioProducto.getProductosPorCategoriaApi(idCategoria).subscribe(
    (productos) => {
      this.productos = productos;
      console.log('Productos por categoría:', productos);
    },
    (error) => {
      console.error('Error al cargar productos:', error);
    }
  );
}
}
