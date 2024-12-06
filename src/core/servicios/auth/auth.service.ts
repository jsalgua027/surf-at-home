import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  get isLoggedIn() { return this.loggedIn.asObservable();}

  private hasToken(): boolean {
    console.log("el token es:" +localStorage.getItem('token'))
     return !!localStorage.getItem('token');
     }


}
