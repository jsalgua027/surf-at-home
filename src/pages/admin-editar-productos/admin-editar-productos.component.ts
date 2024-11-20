import { Component,OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminEditarProductosService } from '../../core/servicios/admin-editar-productos/admin-editar-productos-service';

@Component({
  selector: 'app-admin-editar-productos',
  standalone: true,
  imports: [],
  templateUrl: './admin-editar-productos.component.html',
  styleUrl: './admin-editar-productos.component.scss'
})
export class AdminEditarProductosComponent {
private editarServicios=inject(AdminEditarProductosService); // injecto los servicios
idProducto:string="";
private router=inject(ActivatedRoute);// para rediriguir al componente que quiero

ngOnInit(): void {
   this.idProducto = this.router.snapshot.paramMap.get('id')!;// recojo de la ruta el id
    console.log("ID del producto a editar: ", this.idProducto);
     // Aquí puedes usar el servicio para obtener detalles del producto y cargarlo en el formulario }
}

}