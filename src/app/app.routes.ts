import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { FormCuentaComponent } from '../pages/form-cuenta/form-cuenta.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { ProductosComponent } from '../pages/productos/productos.component';
import { PanelControlAdminComponent } from '../pages/panel-control-admin/panel-control-admin.component';
import { AdminEditarProductosComponent } from '../pages/admin-editar-productos/admin-editar-productos.component';

export const routes: Routes = [
 
  {
    path: '',
    component: InicioComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crear-cuenta',
    component: FormCuentaComponent,
  },
  {
    path: 'productos/:idCategoria',
    component: ProductosComponent,
  },
  {
    path: 'editar-producto/:id',
    component: AdminEditarProductosComponent,
  },
  {
    path: 'admin',
    component: PanelControlAdminComponent,
  }

];
