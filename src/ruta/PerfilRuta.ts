import { Router } from "express";
import perfilControlador from "../controlador/PerfilControlador";
import PerfilDao from "../dao/PerfiDao";

class PerfilRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.lasRutas();
  }

  //No olvidar llamar los end points
  public lasRutas() {
    this.rutaApi.get("/listado", perfilControlador.consultar);
    this.rutaApi.post("/crear", perfilControlador.crear);
    this.rutaApi.delete("/eliminar/:codigo", perfilControlador.eliminar);
    this.rutaApi.put("/actualizar/:codigo", perfilControlador.actualizar);
  }
}

const perfilRuta = new PerfilRuta();

export default perfilRuta.rutaApi;
