import { Component,OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminEditarProductosService } from '../../core/servicios/admin-editar-productos/admin-editar-productos-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-editar-productos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-editar-productos.component.html',
  styleUrl: './admin-editar-productos.component.scss'
})
export class AdminEditarProductosComponent {
private editarServicios=inject(AdminEditarProductosService); // injecto los servicios
idProducto:string="";
private router=inject(ActivatedRoute);
private rutas=inject(Router);

ngOnInit(): void {
   this.idProducto = this.router.snapshot.paramMap.get('id')!;// recojo de la ruta el id
    console.log("ID del producto a editar: ", this.idProducto);
     // Aquí puedes usar el servicio para obtener detalles del producto y cargarlo en el formulario }
}

volver(){
  this.rutas.navigate(['/admin']);
}

}
