import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USUARIOS_MOCK } from '../../../mocks/usuarios-mock';
import { Usuario } from '../../usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminUsuariosService {
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_users.php';
  private http = inject(HttpClient);
  private usuariosSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<
    Usuario[]
  >(USUARIOS_MOCK);

  constructor() {}

  private cargarUsuarios() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = { action: 'getUsers' }; // el cuerpo con el action adecuado para que entre en el case que quiero

    this.http.post<Usuario[]>(this.apiUrl, body, httpOptions).subscribe(
      (usuarios) => {
        this.usuariosSubject.next(usuarios);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    this.cargarUsuarios();
    return this.usuariosSubject.asObservable();
  }
}
