import { Component } from '@angular/core';
import { NbButtonModule, NbLayoutModule, NbThemeModule,NbTabsetModule, NbAccordionModule } from '@nebular/theme';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel-control-admin',
  standalone: true,
  imports: [
    NbButtonModule, 
    NbLayoutModule,
    NbThemeModule,
    NbTabsetModule,
    NbAccordionModule,
    NgbAccordionModule
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

}
