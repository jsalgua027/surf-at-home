import { Categoria } from "../core/categoria/categoria";

export const CATEGORIAS_MOCK: Categoria[] = [
  {
    id_categoria: 1,
    nombre_categoria: 'Surf',
    foto_categoria: '../../assets/inicio/Inicio_surf.jpg',
    descripcion_categoria: 'Todo lo relacionado con el mundo del surf, incluyendo tablas, trajes y accesorios.'
  },
  {
    id_categoria: 2,
    nombre_categoria: 'BodyBoard',
    foto_categoria: '../../assets/inicio/Inicio_body.jpg',
    descripcion_categoria: 'Equipo y accesorios para los entusiastas del bodyboard.'
  },
  {
    id_categoria: 3,
    nombre_categoria: 'Skate',
    foto_categoria: '../../assets/inicio/Inicio_Skate.jpg',
    descripcion_categoria: 'Artículos para skate, desde tablas hasta ruedas y protecciones.'
  },
  {
    id_categoria: 4,
    nombre_categoria: 'Neoprenos',
    foto_categoria: '../../assets/inicio/Inicio_neoprenos.jpg',
    descripcion_categoria: 'Diversos tipos de neoprenos para diferentes deportes acuáticos.'
  }
];
