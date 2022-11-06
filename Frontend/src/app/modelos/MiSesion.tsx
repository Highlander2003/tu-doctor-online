class MiSesion {
    public codUsuario: string;
    public correo: string;
    public perfil: string;
  
    constructor(cod: string, cor: string, per: string) {
      this.codUsuario = cod;
      this.correo = cor;
      this.perfil = per;
    }
  }
  
  export default MiSesion;