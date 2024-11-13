import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { authInterceptor } from './core/interceptors/token.interceptors';
import { NbThemeModule,NbLayoutModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideAnimations } from '@angular/platform-browser/animations';

const nbThemeProviders = NbThemeModule.forRoot({ name: 'default' }).providers;
export const appConfig: ApplicationConfig = {
 // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
  providers: [ 
    provideRouter(routes),
    ...(nbThemeProviders || []),
    BrowserAnimationsModule,
    provideAnimations(),
  ]
};
