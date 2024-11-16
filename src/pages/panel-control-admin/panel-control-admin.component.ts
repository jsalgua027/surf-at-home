import { Component } from '@angular/core';
import { NbButtonModule, NbLayoutModule, NbThemeModule,NbTabsetModule, NbAccordionModule } from '@nebular/theme';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProductosComponent } from "../admin-productos/admin-productos.component";
import { AdminPedidosComponent } from '../admin-pedidos/admin-pedidos.component';
import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component';


@Component({
  selector: 'app-panel-control-admin',
  standalone: true,
  imports: [
    NbButtonModule,
    NbLayoutModule,
    NbThemeModule,
    NbTabsetModule,
    NbAccordionModule,
    NgbAccordionModule,
    NgbNavModule,
    AdminProductosComponent,
    AdminPedidosComponent,
    AdminUsuariosComponent 
],
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
  templateUrl: './panel-control-admin.component.html',
  styleUrl: './panel-control-admin.component.scss'
})
export class PanelControlAdminComponent {
	active = 0;
}
