import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../producto/producto';
import { Categoria } from '../../categoria/categoria';
import { CATEGORIAS_MOCK } from '../../../mocks/categoria-mock';
import { PRODUCTOS_MOCK } from '../../../mocks/productos-mock';

@Injectable({
    providedIn: 'root',
  })

  export class AdminEditarProductosService{}