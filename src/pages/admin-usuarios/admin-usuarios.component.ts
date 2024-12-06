import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../core/usuario/usuario';
import { TipoUsuario } from '../../core/enums/tipo-usuario';
import { AdminUsuariosService } from '../../core/servicios/admin-usuarios/admin-usuarios-service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.scss',
})
export class AdminUsuariosComponent {
  tipoUser = TipoUsuario; //tipo de usuario
  listaUsuarios: Usuario[] = []; //array donde guardo los usuarios
  private adminUsuariosService = inject(AdminUsuariosService); //injecto mi servicio

  constructor() {}

  ngOnInit(): void {
    this.adminUsuariosService.getUsuarios().subscribe((datos: Usuario[]) => {
      this.listaUsuarios = datos;
      console.log('Los usuarios encontrados son: ' + this.listaUsuarios);
    });
  }

  borrarUsuario(id_usuario: number): void {
    this.adminUsuariosService.borrarUsuario(id_usuario).subscribe(
      (response) => {
        console.log('Usuario borrado:', response);
         // Actualizar la lista de usuarios 
        this.listaUsuarios = this.listaUsuarios.filter(
          (usuario) => usuario.id_usuario !== id_usuario
        );
      },
      (error) => {
        console.error('Error al borrar el usuario:', error);
      }
    );
  }
}
