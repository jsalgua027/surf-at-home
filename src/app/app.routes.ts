import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { FormCuentaComponent } from '../pages/form-cuenta/form-cuenta.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { ProductosComponent } from '../pages/productos/productos.component';
import { PanelControlAdminComponent } from '../pages/panel-control-admin/panel-control-admin.component';



export const routes: Routes = [
    {
        path:'',
        component:PanelControlAdminComponent

    },
/**{
        path:'',
        component:InicioComponent

    }, */
    
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'crear-cuenta',
        component:FormCuentaComponent

    },
    {
        path:'productos/:idCategoria',
        component:ProductosComponent

    },
    
    


];
