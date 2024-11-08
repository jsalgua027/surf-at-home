import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { FormCuentaComponent } from '../pages/form-cuenta/form-cuenta.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
InicioComponent


export const routes: Routes = [
    
    {
        path:'',
        component:InicioComponent

    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'crear-cuenta',
        component:FormCuentaComponent

    },
    
    


];