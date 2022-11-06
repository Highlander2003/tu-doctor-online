import ApiBack from "../utilidades/dominios/ApiBack";

class ServicioPublico {
  // Servicio para crear usuarios
  // *******************************************************************
  public static async crearUsuario(objeto: any) {
    const datosEnviar = { method: "POST", body: JSON.stringify(objeto), headers: { "Content-Type": "application/json; charset=UTF-8" },
    };
    const url = ApiBack.URL + ApiBack.CREAR_USUARIO;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Servicio para iniciar sesión
  // *******************************************************************
  public static async iniciarSesion(objeto: any) {
    const datosEnviar = {
      method: "POST",
      body: JSON.stringify(objeto),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };
    const url = ApiBack.URL + ApiBack.INICIAR_SESION;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        return datos;
      })
      .catch((miError) => {
        return miError;
      });
    return respuesta;
  }
}

export default ServicioPublico;

