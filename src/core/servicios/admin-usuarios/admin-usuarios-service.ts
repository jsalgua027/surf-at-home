import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../../usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminUsuariosService {
  private apiProd= 'https://surf-at-home.endinahosting.com/surf-at-home/api/get_users.php';
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_users.php';
  private http = inject(HttpClient);
  private usuariosSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

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
  // para la carga de usuarios en la tabla
  getUsuarios(): Observable<Usuario[]> {
    this.cargarUsuarios();
    return this.usuariosSubject.asObservable();
  }

  //método para borrar usuarios

  borrarUsuario(id_usuario: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = { action: 'deleteUser', id_usuario }; // el cuerpo con el action adecuado y el id del usuario
    return this.http.post<any>(this.apiUrl, body, httpOptions).pipe(
      catchError((error) => {
        console.error('Error al borrar el usuario:', error);
        return throwError(error);
      })
    );
  }
}
