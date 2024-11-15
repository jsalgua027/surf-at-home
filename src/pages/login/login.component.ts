import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router} from '@angular/router';

/**comentarios de  prueba de user para git */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
   
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router=inject(Router);
  constructor(){}
  
  createAccount(){}
  onSubmit(){}
  irCrearCuenta(){
    this.router.navigate(['/crear-cuenta']);
  }
  
  
}
