import PerfilEntidad from "./PerfilEntidad";

class UsuarioEntidad {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public fechaUsuario: Date;
  public estadoUsuario: number;
  public codPerfil: PerfilEntidad;

  constructor(
    nom: string,
    pass: string,
    correo: string,
    fecha: Date,
    est: number,
    codP: PerfilEntidad
  ) {
    this.nombreUsuario = nom;
    this.claveUsuario = pass;
    this.correoUsuario = correo;
    this.fechaUsuario = fecha;
    this.estadoUsuario = est;
    this.codPerfil = codP;
  }
}
export default UsuarioEntidad;



