import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'surf-at-home';
  showFooter = true;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showFooter = !event.url.includes('/admin')&& !event.url.includes('/editar-producto/');
      });
  }
}
