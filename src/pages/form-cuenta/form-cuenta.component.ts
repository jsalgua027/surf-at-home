import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/servicios/usuarios/usuarios-service';
@Component({
  selector: 'app-form-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-cuenta.component.html',
  styleUrl: './form-cuenta.component.scss',
})
export class FormCuentaComponent {
  private router = inject(Router);
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);
  cuentaForm: FormGroup;

  constructor() {
    this.cuentaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  get email() {
    return this.cuentaForm.get('email');
  }

  get password() {
    return this.cuentaForm.get('password');
  }

  get nombre() {
    return this.cuentaForm.get('nombre');
  }

  get direccion() {
    return this.cuentaForm.get('direccion');
  }

  get telefono() {
    return this.cuentaForm.get('telefono');
  }

  onSubmit() {
    if (this.cuentaForm.valid) {
      const usuario = {
        email: this.email?.value,
        password: this.password?.value,
        nombre: this.nombre?.value,
        direccion: this.direccion?.value,
        telefono: this.telefono?.value,
      };
      console.log(
        'Datos recogidos en onSubmit: ',
        JSON.stringify(usuario, null, 2)
      );
      this.usersService.createUser(usuario).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente', response);
          this.router.navigate(['/']); // Redirigir después de crear la cuenta
        },
        (error) => {
          console.error('Error al crear el usuario', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
