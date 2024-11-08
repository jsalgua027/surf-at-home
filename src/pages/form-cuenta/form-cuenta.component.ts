import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router} from '@angular/router';

@Component({
  selector: 'app-form-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './form-cuenta.component.html',
  styleUrl: './form-cuenta.component.scss'
})
export class FormCuentaComponent {
  private router=inject(Router);
  constructor(){}
  createAccount(){}
  onSubmit(){}

}
