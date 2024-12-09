import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../../usuario/usuario';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiProd= 'http://localhost/tiendaSurf/api/get_users.php';
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_users.php';
  private http = inject(HttpClient);
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  // Observable para que otros componentes puedan suscribirse
  currentUser$ = this.currentUserSubject.asObservable();

  login(usuario: { email: string; password: string }): Observable<any> {
    const body = {
      action: 'login',
      email: usuario.email,
      password: usuario.password,
    };
    return this.http.post<any>(this.apiProd, body).pipe(
      map((response) => {
        const user: Usuario = {
          id_usuario: response.id_usuario,
          email: response.email,
          password: response.password,
          nombre: response.nombre,
          direccion: response.direccion,
          telefono: response.telefono,
          tipo: response.tipo,
          token: response.token,
        };
        this.currentUserSubject.next(user); // Almacenar usuario en el BehaviorSubject
        //  console.log('Usuario obtenido y almacenado en objeto:', JSON.stringify(user));
        return user;
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  createUser(usuario: {
    email: string;
    password: string;
    nombre: string;
    direccion: string;
    telefono: string;
  }): Observable<any> {
    const body = { action: 'createUser', ...usuario };
    return this.http
      .post<any>(this.apiProd, body, this.httpOptions)
      .pipe(catchError(this.handleError<any>('createUser')));
  }

  // Obtener la fecha actual  para clave y el token obtenido como valor
  saveTokenWithDate(token: string): void {
    const date = new Date().toISOString();
    localStorage.setItem(date, token);
  }

  //Salgo de la sesión  y borro el LocalStorage
  logout(): void {
    localStorage.clear();
    // console.log('User logged out and all tokens cleared from localStorage');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
