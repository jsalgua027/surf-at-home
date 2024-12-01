
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ProductoService } from '../../core/servicios/productos/serv-productos';
import { HttpClient } from '@angular/common/http';
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
 // categoriaSeleccionada: number = 1;
 private servicioProducto=inject(ProductoService);
constructor(private router: Router){}
  ngOnInit(): void {

    this.servicioProducto.getAllProducts().subscribe(
      products => {console.log("LOS PRODUCTOS DESDE LA LLAMADA DE LA API:"+JSON.stringify(products,null,2));

       });

  }


irAProductos(idCategoria: number) { 
  this.router.navigate(['/productos', idCategoria]);
 }
}
