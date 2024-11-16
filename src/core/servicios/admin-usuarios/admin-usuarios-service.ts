import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableNotification } from 'rxjs';
import { USUARIOS_MOCK } from '../../../mocks/usuarios-mock';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../enums/tipo-usuario';


@Injectable({
  providedIn: 'root',
})
export class AdminUsuariosService {
  private usuariosSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>(USUARIOS_MOCK);

  constructor() {}

  getUsuarios(): Observable<Usuario[]> {
    return this.usuariosSubject.asObservable();
  }
}
