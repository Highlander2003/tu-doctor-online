class CrearUsuario {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;

  constructor(nom: string, cor: string, cla: string) {
    this.nombreUsuario = nom;
    this.correoUsuario = cor;
    this.claveUsuario = cla;
  }
}

export default CrearUsuario;
