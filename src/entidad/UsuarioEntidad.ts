import PerfilEntidad from "./PerfilEntidad";

class UsuarioEntidad {
  public nombreUsuario: String;
  public correoUsuario: String;
  public claveUsuario: String;
  public fechaUsuario: Date;
  public estadoUsuario: number;
  public codPerfil: PerfilEntidad;

  constructor(
    nom: String,
    pass: String,
    correo: String,
    fecha: Date,
    est: number,
    codP: PerfilEntidad
  ) {
    this.nombreUsuario = nom;
    this.correoUsuario = correo;
    this.claveUsuario = pass;
    this.fechaUsuario = fecha;
    this.estadoUsuario = est;
    this.codPerfil = codP;
  }
}

export default UsuarioEntidad;

