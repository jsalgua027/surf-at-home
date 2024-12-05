import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost/Proyectos/surf-at-home/api/get_users.php';
  private http = inject(HttpClient);
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), };

  login(usuario: { email: string; password: string }): Observable<any> {
    const body = {
      action: 'login',
      email: usuario.email,
      password: usuario.password,
    };
    return this.http
      .post<any>(this.apiUrl, body)
      .pipe(catchError(this.handleError<any>('login')));
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
      .post<any>(this.apiUrl, body, this.httpOptions)
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
    console.log('User logged out and all tokens cleared from localStorage');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
