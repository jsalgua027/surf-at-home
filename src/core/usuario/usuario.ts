import { TipoUsuario } from "../enums/tipo-usuario";

export interface Usuario{

 id_usuario:number;
 email:string;
 password:string;
 nombre:string;
 direccion:string;
 telefono:string;
 tipo:string;
 token:string

}