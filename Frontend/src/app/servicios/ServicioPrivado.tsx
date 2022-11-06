import ApiBack from "../utilidades/dominios/ApiBack";

class ServicioPrivado {
  // Servicio con bearer para hacer peticiones GET
  // *******************************************************************
  public static async peticionGET(urlServicio: string) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenMintic"));

    const datosEnviar = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer, },
    };

    const url = ApiBack.URL + urlServicio;
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

  // Servicio con bearer para hacer peticiones POST
  // *******************************************************************
  public static async peticionPOST(urlServicio: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenMintic"));

    const datosEnviar = {
      method: "POST",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlServicio;
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

  // Servicio con bearer para hacer peticiones DELETE
  // *******************************************************************
  public static async peticionDELETE(urlServicio: string) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenMintic"));

    const datosEnviar = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlServicio;
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

  // Servicio con bearer para hacer peticiones PUT
  // *******************************************************************
  public static async peticionPUT(urlServicio: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenMintic"));

    const datosEnviar = {
      method: "PUT",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlServicio;
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

export default ServicioPrivado;
