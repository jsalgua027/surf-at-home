import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarProductosComponent } from './admin-editar-productos.component';

describe('AdminEditarProductosComponent', () => {
  let component: AdminEditarProductosComponent;
  let fixture: ComponentFixture<AdminEditarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditarProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
