import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost/Proyectos/api/get_users.php';
  private http = inject(HttpClient);

  login(usuario: { email: string; password: string }): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?email=${usuario.email}&password=${usuario.password}`
    );
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
}
