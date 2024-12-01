import { Component } from '@angular/core';
import { RouterOutlet,RouterModule,provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
   
   
],

})
export class AppComponent {
  title = 'surf-at-home';
}
