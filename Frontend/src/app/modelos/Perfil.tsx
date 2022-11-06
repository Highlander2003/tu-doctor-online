class Perfil {
    public _id: string;
    public nombrePerfil: string;
    public estadoPerfil: number;
  
    constructor(id: string, nom: string, est: number) {
      this._id = id;
      this.nombrePerfil = nom;
      this.estadoPerfil = est;
    }
  }
  
  export default Perfil;