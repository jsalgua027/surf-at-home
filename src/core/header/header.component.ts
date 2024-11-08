import { Component ,inject, TemplateRef} from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgbDatepickerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private offcanvasService = inject(NgbOffcanvas);
  private router=inject(Router);
	closeResult = '';

constructor(){}

/*Enrutamiento de la cabecera y el menu offcanvas*/
	irALogin(){
		this.router.navigate(['/login']);
	  }

	  irAInicio(){
		this.router.navigate(['/']);
	  }

  open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case OffcanvasDismissReasons.ESC:
				return 'by pressing ESC';
			case OffcanvasDismissReasons.BACKDROP_CLICK:
				return 'by clicking on the backdrop';
			default:
				return `with: ${reason}`;
		}
	}

	openEnd(carrito: TemplateRef<any>) {
		this.offcanvasService.open(carrito, { position: 'end' });
	}




}
