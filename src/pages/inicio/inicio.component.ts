
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
 // categoriaSeleccionada: number = 1;
constructor(private router: Router){}

irAProductos(idCategoria: number) { this.router.navigate(['/productos', idCategoria]); }
}
