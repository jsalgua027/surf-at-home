import { Usuario } from '../core/usuario/usuario';
import { TipoUsuario } from '../core/enums/tipo-usuario';
export const USUARIOS_MOCK: Usuario[] = [
    {
        id_usuario: 1,
        email: 'admin@example.com',
        password: '12345',
        nombre: 'Admin User',
        direccion: '123 Admin St.',
        telefono: '555-1234', tipo:
            TipoUsuario.administrador,
        token: 'admin-token-123'
    },
    {
        id_usuario: 2,
        email: 'cliente1@example.com',
        password: '1234',
        nombre: 'Cliente Uno',
        direccion: '456 Cliente Ave.',
        telefono: '555-5678',
        tipo: TipoUsuario.cliente,
        token: 'cliente1-token-456'
    },
    {
        id_usuario: 3,
        email: 'cliente2@example.com',
        password: '1234',
        nombre: 'Cliente Dos',
        direccion: '789 Cliente Blvd.',
        telefono: '555-9012',
        tipo: TipoUsuario.cliente,
        token: 'cliente2-token-789'
    },
    {
        id_usuario: 4,
        email: 'cliente3@example.com',
        password: '1234',
        nombre: 'Cliente Tres',
        direccion: '101 Cliente Ct.',
        telefono: '555-3456',
        tipo: TipoUsuario.cliente,
        token: 'cliente3-token-101'
    }
];