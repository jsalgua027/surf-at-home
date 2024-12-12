import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../core/servicios/usuarios/usuarios-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private usuarioService = inject(UsersService);

 //variables para recoger el formulario
  email: string = '';
  password: string = '';

//variables para lanzar alerta
showAlert: boolean = false;
alertMessage: string | null = null;

  constructor() {}

  onSubmit() {
    // Crear un objeto con los datos del formulario
    if (this.email.trim() === '' || this.password.trim() === '') {
      console.error('Email o contraseña vacíos');
      return;
    }
    const usuario = {
      email: this.email,
      password: this.password,
    };
    console.log(
      'los datos recogidos en el onsubmit' + JSON.stringify(usuario, null, 2)
    );
    // Enviar los datos al servicio
    this.usuarioService.login(usuario).subscribe(
      (response: any) => {
             
        // Guardo el Token
        this.usuarioService.saveTokenWithDate(response.token);
       
        //gestiono el tipo de usuario
        if (response.tipo === 'administrador') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        // Manejar los errores aquí
        this.alertMessage = 'DATOS INTRODUCIDOS ERRONEOS';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.alertMessage = null;
          }, 2000);
        console.error('Error en el login', error);
      }
    );
  }

  irCrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }
}
